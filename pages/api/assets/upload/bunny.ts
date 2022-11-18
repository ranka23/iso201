import type { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import { bunnyWebHook } from "controller/upload"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return bunnyWebHook(req, res)
  }

  return res.status(404).json({ error: errors.route_not_found })
}
