import errors from "constants/errors"
import type { NextApiRequest, NextApiResponse } from "next"
import withAuth from "middleware/withAuth"
import { hasUserLikedAsset } from "controller/stats"

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return hasUserLikedAsset(req, res)
  } else if (req.method === "POST") {
    
  }
  return res.status(404).json({ error: errors.request_not_found })
}

export default withAuth(handler, true)
