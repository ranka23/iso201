import { CookieOptions, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../model/User"
import getGoogleOAuthTokens from "../services/google"
import { signToken } from "../services/jwt"
import "dotenv/config"
import { getPG } from "../utils/getClients"
import log from "../utils/logger"
import "dotenv/config"
import errors from "../constants/errors"

export const login = async (req: Request, res: Response) => {
  // get code from qs
  const code = req.query.code as string

  try {
    // get Google login id and access token
    const { id_token } = await getGoogleOAuthTokens({ code })
    // get userInfo from token
    const googleUser = jwt.decode(id_token) as GoogleUser

    const { email, email_verified, name, picture } = googleUser

    if (!email_verified) {
      return res
        .status(403)
        .redirect(`${process.env.ORIGIN}/error?name=${errors.unverified_email}`)
    }

    // upsert user
    const user = await new User(
      0,
      email,
      name,
      false,
      picture,
      new Date().getTime()
    ).create(getPG(req))

    if (user?.id && user?.email) {
      //TODO: Send a welcome email to the user

      // create access & refresh tokens
      const accessToken = await signToken(
        {
          id: user?.id?.toString(),
          email: user?.email,
          pro: user?.pro,
        },
        process.env.JWT_ACCESS_TOKEN_EXPIRY as string,
        process.env.JWT_ACCESS_TOKEN_SECRET as string
      )
      const refreshToken = await signToken(
        {
          id: user.id.toString(),
          email: user.email,
        },
        process.env.JWT_REFRESH_TOKEN_EXPIRY as string,
        process.env.JWT_REFRESH_TOKEN_SECRET as string
      )

      // set cookies
      const cookieOptions: CookieOptions = {
        maxAge: 900000, // 15mins
        httpOnly: true,
        domain: process.env.DOMAIN as string,
        path: "/",
        sameSite: "lax",
        secure: false,
      }
      res.cookie("accessToken", `Bearer ${accessToken}`, cookieOptions)
      res.cookie("refeshToken", `Bearer ${refreshToken}`, {
        ...cookieOptions,
        maxAge: 3.154e10, // 1 year
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
          `${process.env.ORIGIN}/error?name=${errors.create_user_error}`
        )
    }
  } catch (error: any) {
    log.error("LOGIN CONTROLLER ERROR: ", error)
    return res
      .status(403)
      .redirect(`${process.env.ORIGIN}/error?name=${errors.login_error}`)
  }
}
