import type { NextApiRequest, NextApiResponse } from "next"
import withAuth from "middleware/withAuth"

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "GET Called" })
  } else if (req.method === "POST") {
    return res.status(200).json({ message: "POST Called" })
  } else if (req.method === "PUT") {
    return res.status(200).json({ message: "PUT Called" })
  } else if (req.method === "DELETE") {
    return res.status(200).json({ message: "DELETE Called" })
  }
}

export default handler
