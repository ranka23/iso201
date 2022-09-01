import jwt from "jsonwebtoken"
import log from "utils/logger"
import { NextApiResponse } from "next"
import { CookieSerializeOptions } from "next/dist/server/web/types"
import { serialize } from "cookie"

export const signToken = (
  tokenData: RequestUser,
  expiresIn: string,
  secret: string
): Promise<string | null | undefined> =>
  new Promise<string | null | undefined>(async (resolve, reject) => {
    const options = {
      expiresIn: expiresIn,
      issuer: process.env.SERVER || "iso201",
      audience: tokenData.id.toString(),
    }

    jwt.sign(tokenData, secret as string, options, (err, token) => {
      if (err) {
        log.error("JWT sign Access token failed", err)
        reject(new Error("Jwt sign failed"))
        return
      }
      resolve(token)
    })
  })

export const verifyRefreshToken = (refreshToken: string): Promise<number> =>
  new Promise<number>((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      (err, payload: any) => {
        if (err) return reject(new Error("Unauthorized"))
        const userId = payload?.id as number
        if (userId) {
          resolve(userId)
        }
      }
    )
  })

export const isUserPro = (accessToken: string): Promise<boolean> =>
  new Promise<boolean>((resolve) => {
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      (error, payload: any) => {
        if (payload) {
          if (payload.pro) {
            return resolve(true)
          }
        } else if (error?.name === "TokenExpiredError") {
          const decode: any = jwt.decode(accessToken)
          if (decode?.pro) {
            return resolve(true)
          }
        }
        return resolve(false)
      }
    )
  })

export const signAndSetJWTTokens = async (
  res: NextApiResponse,
  { id, email, pro }: RequestUser
) => {
  try {
    const accessToken = await signToken(
      {
        id,
        email,
        pro,
      },
      process.env.JWT_ACCESS_TOKEN_EXPIRY as string,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    )
    const refreshToken = await signToken(
      {
        id: id,
        email: email,
      },
      process.env.JWT_REFRESH_TOKEN_EXPIRY as string,
      process.env.JWT_REFRESH_TOKEN_SECRET as string
    )

    // set cookies
    const cookieOptions: CookieSerializeOptions = {
      maxAge: 900000,
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: true,
    }
    res.setHeader("Set-Cookie", [
      serialize("accessToken", accessToken as string, cookieOptions),
      serialize("refreshToken", refreshToken as string, {
        ...cookieOptions,
        maxAge: 3.154e10, // 1 year
        path: "/api/auth/refresh",
      }),
    ])
    return
  } catch (error: any) {
    throw new Error(error)
  }
}

export const clearAuthCookies = (response: NextApiResponse) => {
  response.setHeader("Set-Cookie", [
    `accessToken=deleted; Max-Age=0`,
    `refreshToken=deleted; Max-Age=0`,
  ])
  return response.status(403).redirect("/")
}
