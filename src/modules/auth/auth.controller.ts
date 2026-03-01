import { Request, Response } from "express"
import { registerSchema, loginSchema } from "./auth.validation"
import { registerUser, loginUser } from "./auth.service"

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body)
  const user = await registerUser(data.email, data.password)
  res.status(201).json({ id: user.id, email: user.email })
}

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body)
  const result = await loginUser(data.email, data.password)
  res.json(result)
}

export const me = async (req: Request, res: Response) => {
  res.json(req.user)
}