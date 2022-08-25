import type { NextApiRequest, NextApiResponse } from "next"
import errors from "constants/errors"
import { createPaypalOrder } from "controller/subscriptions"
import withAuth from "../../../../middleware/withAuth"

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(404).json({ error: errors.route_not_found })
  }

  return createPaypalOrder(req, res)
}

export default withAuth(handler)
