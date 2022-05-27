import jwt from 'jsonwebtoken'

export function generateToken(params = {}, expTime = '1d') {
    const secret = process.env.SECRET_KEY!
    return jwt.sign(params, secret, { expiresIn: expTime })
}