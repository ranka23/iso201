import type { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import { videoEntry } from "controller/upload"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return videoEntry(req, res)
  }
  return res.status(404).json({ error: errors.request_not_found })
}
