import { Request, Response } from "express"

export const login = (_req: Request, res: Response) => {
  const item = {
    text: "Hello World",
  }
  res.json(item)
}

/* 

export const signUp = (req: Request, res: Response, next: NextFunction) => {}

export const shutdown = (req: Request, res: Response, next: NextFunction) => {}

*/