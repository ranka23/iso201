import { Response } from "express"

export default (res: Response, message?: string): Response => {
  return res.status(500).json({ error: message || "Server error" })
}
