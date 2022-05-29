import { Request, Response } from "express";

export function errorHandler(req: Request, res: Response, err: any) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" })
}