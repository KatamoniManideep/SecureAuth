
export interface User{
    id: string,
    email: string,
    password: string,
    role: 'user' | 'admin',
    created_at: Date
}

export interface JwtPayload {
    userId: string,
    role: 'user' | 'admin'
}