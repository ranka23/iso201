import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import User from "model/User"
import getGoogleOAuthTokens from "services/google"
import { clearAuthCookies, signAndSetJWTTokens, verifyRefreshToken } from "services/jwt"
import log from "utils/logger"
import errors from "constants/errors"
import Subscription from "../model/Subscription"

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  // get code from qs
  const code = req.query.code as string

  try {
    // get Google login id and access token
    const { id_token } = await getGoogleOAuthTokens({ code })
    // get userInfo from token
    const googleUser = jwt.decode(id_token) as GoogleUser

    const { email, email_verified, name } = googleUser
    // if email is verified by Google
    if (!email_verified) {
      return res
        .status(403)
        .redirect(
          `${process.env.ORIGIN}/error?code=${errors.unverified_email.code}&message=${errors.unverified_email.message}`
        )
    }

    // upsert user
    const user = await new User(
      0,
      email,
      name,
      false,
      new Date().getTime()
    ).create()

    if (user?.id && user?.email) {
      //TODO: Send a welcome email to the user

      // create access & refresh tokens
      await signAndSetJWTTokens(res, {
        id: user.id,
        email: user.email,
        pro: user.pro,
      })

      // redirect back to client
      if (user.pro) {
        return res.redirect(process.env.ORIGIN as string)
      } else {
        return res.redirect(`${process.env.ORIGIN}/subscribe`)
      }
    } else {
      return res
        .status(500)
        .redirect(
          `${process.env.ORIGIN}/error?code=${errors.create_user_error.code}&message=${errors.create_user_error.message}`
        )
    }
  } catch (error: any) {
    log.error("LOGIN CONTROLLER ERROR: ", error)
    return res
      .status(403)
      .redirect(
        `${process.env.ORIGIN}/error?code=${errors.login_error.code}&message=${errors.login_error.message}`
      )
  }
}

export const refreshAuthToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const refreshToken = req.cookies["refreshToken"] as string
  if (!refreshToken) {
    return res
      .status(308)
      .redirect(
        `${process.env.ORIGIN}/error?code=${errors.refresh_token_not_found.code}&message=${errors.refresh_token_not_found.message}`
      )
  }

  try {
    const userId = await verifyRefreshToken(refreshToken)

    if (userId) {
      const user = await new User(userId).readBasicInfo()
      if (user) {
        await signAndSetJWTTokens(res, {
          id: user.id as number,
          email: user.email as string,
          pro: user.pro,
        })
        return res.json({ message: "success" })
      } else {
        return clearAuthCookies(res)
      }
    }
  } catch (err: any) {
    return clearAuthCookies(res)
  }
}
