import { Request, Response } from 'express'
import { Multer } from '../config/multer'
import { prisma } from '../database/client'

export const videoController = {
    async listall(req: Request, res: Response) {
        try {
            const videos = await prisma.video.findMany({
                select: {
                    createdAt: true,
                    creatorId: true,
                    id: true,
                    title: true,
                    updatedAt: true,
                }
            })
    
            return res.json(videos);
        } catch (err) {
            return res.status(500).json({ error: "Erro ao listar videos"})
        }
    },
    async createVideo(req:Request, res: Response) {
        try {
            const upload = Multer.single("file")

            upload(req, res, async function(err) {
                if(err) return res.status(400).json({ error: err.message })

                const file = req.file
                const { title, id: creatorId } = req.params

                if(file?.buffer === undefined) return res.status(400).json({error: "File not loaded"})

                const videoBuffer = file.buffer

                const video = await prisma.video.create({
                    data: {
                        title,
                        content: videoBuffer,
                        creator: {
                            connect: { id: creatorId }
                        }
                    },
                })

                let { content, ...data } = video

                return res.json(data)
            })
        } catch (err) {
            return res.status(400).json({ error: "Error creating file" })
        }
    },
    async deleteVideo(req: Request, res: Response) {
        try {
            const { id } = req.params

            const deletedVideo = await prisma.video.delete({ where: { id } })

            return res.status(204).json({})
        } catch (err) {
            return res.status(500).send({ error: "Error deleting video" })
        }
    },
}