import { CookieOptions, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../model/User"
import getGoogleOAuthTokens from "../utils/getGoogleOAuthToken"
import { signToken } from "../utils/jwt"
import servErr from "../utils/servErr"
import "dotenv/config"
import { getPG } from "../utils/getClients"

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
      return res.status(403).json({
        error:
          "Unverified Google account. Please verify your email address with Google and try again.",
      })
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

    if (user) {
      //TODO: Send a welcome email to the user

      // create access & refresh tokens
      const accessToken = signToken(
        {
          id: user.id.toString(),
          email: user.email,
          isPro: user.isPro,
        },
        process.env.JWT_ACCESS_TOKEN_EXPIRY as string,
        process.env.JWT_ACCESS_TOKEN_SECRET as string
      )
      const refreshToken = signToken(
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
      res.cookie("accessToken", accessToken, cookieOptions)
      res.cookie("refeshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 3.154e10, // 1 year
      })

      // redirect back to client
      if (user.isPro) {
        res.redirect(process.env.ORIGIN as string)
      } else {
        res.redirect(`${process.env.ORIGIN}/subscribe`)
      }
    } else {
      return res
        .status(500)
        .json({ error: "Failed to create user" })
        .redirect("/")
    }
  } catch (error: any) {
    servErr(res)
  }
}
