import type { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import { getSimilarThumbnails } from "controller/assets"

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getSimilarThumbnails(req, res)
  }
  return res.status(404).json({ error: errors.request_not_found })
}

export default handler
