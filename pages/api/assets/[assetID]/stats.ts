import errors from "constants/errors"
import type { NextApiRequest, NextApiResponse } from "next"
import { getStats, updateStats } from "controller/stats"
import withAuth from "../../../../middleware/withAuth"

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getStats(req, res)
  }
  if (req.method === "POST") {
    return updateStats(req, res)
  }
  return res.status(404).json({ error: errors.request_not_found })
}

export default withAuth(handler, true)
