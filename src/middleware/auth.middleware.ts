import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JwtPayload } from "../modules/auth/auth.types"

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: "Unauthorized" })

  const token = header.split(" ")[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: "Invalid token" })
  }
}