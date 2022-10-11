import type { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import { getAssets } from "controller/assets"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return getAssets(req, res)
  }
  return res.status(404).json({ error: errors.request_not_found })
}
