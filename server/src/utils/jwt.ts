import jwt from "jsonwebtoken"
import logger from "./logger"
import "dotenv/config"

const log = logger()

export const signToken = (
  tokenData: JWTTokenData,
  expiresIn: string,
  secret: string
): Promise<string | null | undefined> =>
  new Promise<string | null | undefined>(async (resolve, reject) => {
    const options = {
      expiresIn: expiresIn,
      issuer: process.env.SERVER || "iso201",
      audience: tokenData.id,
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

  export const verifyToken = (token: string, type: "Access" | "Refresh"): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const secret = type === "Refresh" ? process.env.JWT_ACCESS_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET
    jwt.verify(token,  secret as string, (err, payload: any) => {
      if (err) return reject(new Error("Unauthorized"))
      const userId = payload?.aud as string
      if (userId) {
        resolve(userId)
      }
    })
  })
