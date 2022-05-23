import { Request, Response } from 'express'
import { prisma } from '../database/client'

export const videoController = {
    async listall(req: Request, res: Response) {
        try {
            const videos = await prisma.video.findMany()
    
            return res.json(videos);
        } catch (err) {
            return res.status(500).json({ error: "Erro ao listar videos"})
        }
    },
    async createVideo(req: Request, res: Response) {
        try {
            const file = req.body.file
            console.log(file)
            return res.json({ message: "method not implemented" })
        } catch (err) {
            return res.status(500).json({ error: "Error creating video"})
        }
    },
}