import { NextApiResponse, NextApiRequest, NextApiHandler } from "next"
import jwt from "jsonwebtoken"
import errors from "constants/errors"

const withAuth =
  (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
      const accessToken = req.cookies["accessToken"]

      if (!accessToken) {
        res.status(498).json({ error: errors.no_access_token })
        return res.end()
        
      }

      return jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET as string,
        async (err, decoded) => {
          if (err) {
            res.status(498).json({ error: errors.jwt_verification_error })
            return res.end()
          }
          req.user = decoded as RequestUser
          return handler(req, res) as Promise<any>
        }
      )
    }

export default withAuth
