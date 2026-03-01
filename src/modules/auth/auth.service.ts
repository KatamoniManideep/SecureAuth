import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { pool } from "../../config/db"
import { User, JwtPayload } from "./auth.types"
import { v4 as uuidv4 } from "uuid"

export const registerUser = async (email: string,password: string)=>{
    const hashed = await bcrypt.hash(password,10);
    const id= uuidv4();

    const result = await pool.query<User>(
    `INSERT INTO users (id, email, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [id, email, hashed]
    )

    return result.rows[0];
}

export const loginUser = async (email:string,password:string)=>{
    const result = await pool.query<User>(
        'SELECT *FROM users WHERE email = $1',
        [email]
    )

    const user = result.rows[0]
    if(!user) throw new Error("INvalid credentaials")

    const valid = await bcrypt.compare(password, user.password)
    if(!valid) throw new Error("Invalid credentials")

    const payload: JwtPayload={
        userId: user.id,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET as string,{expiresIn:"15m"})
    return {token }
}