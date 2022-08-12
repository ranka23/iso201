import { Request, Response } from "express"

export const getUsersDetails = (
  _req: Request,
  res: Response,
) => {
  res.send("Hello World")
}
