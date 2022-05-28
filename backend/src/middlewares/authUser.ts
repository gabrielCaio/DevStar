import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const { SECRET_KEY } = process.env

type Decoded = {
    id: string,
}

export function authUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if(authHeader === null || authHeader === undefined) {
        return res.status(401).json({ error: "No token provided" })
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2) return res.status(401).json({ error: "Token Error"})

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: "Token Malformatted" })

    jwt.verify(token, SECRET_KEY!, (err, decoded) => {
        if (err || decoded === undefined) return res.status(401).send({ error: "Token Invalid" });

        const newDecoded = decoded as Decoded
        req.userId = newDecoded.id;
        console.log(req.userId)
    
        return next();
      });
}