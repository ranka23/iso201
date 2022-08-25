import type { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import { refreshAuthToken } from "controller/auth"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(404).json({ error: errors.route_not_found })
  }

  return refreshAuthToken(req, res)
}