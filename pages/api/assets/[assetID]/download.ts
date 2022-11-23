import type { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import { downloadAsset } from "controller/assets"
import withAuth from "middleware/withAuth"

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return downloadAsset(req, res)
  }
  return res.status(404).json({ error: errors.request_not_found })
}

export default withAuth(handler, true)
