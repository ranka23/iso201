import jwt from "jsonwebtoken"
import log from "../utils/logger"
import "dotenv/config"
import { NextFunction, Request, Response } from "express"

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

  export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const authCookie = req.cookies.accessToken as string
    if (!authCookie.includes("Bearer ")) { 
      return res.clearCookie("accessToken").status(498).redirect(process.env.ORIGIN as string)
    }
    const token = authCookie.split(" ")[1]

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string, (err, decoded) => {
      if (err) {
        log.error("JWT verify Access token failed", err)
        return res.clearCookie("accessToken").status(498).redirect(process.env.ORIGIN as string)
      }
      req.user = decoded
      next()
    })
  }
