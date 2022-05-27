import { Request, Response } from 'express'
import { Multer } from '../services/multer'
import { prisma } from '../database/client'
import { Readable } from 'stream'

export const videoController = {
    //#region : CRUD Video
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
            return res.status(500).json({ error: "Erro ao listar videos" })
        }
    },
    async createVideo(req: Request, res: Response) {
        try {
            const { title, id: creatorId } = req.params
            const { buffer, size } = await Multer.singleVideo(req, res)

            console.log(buffer)

            const video = await prisma.video.create({
                data: {
                    title,
                    size: size,
                    content: buffer,
                    creator: {
                        connect: { id: creatorId }
                    }
                },
            })

            let { content, ...data } = video

            return res.json(data)
        } catch (err) {
            return res.status(400).json({ error: "Error creating file" })
        }
    },
    async deleteVideo(req: Request, res: Response) {
        try {
            const { id } = req.params

            const deletedVideo = await prisma.video.delete({ where: { id: id } })

            return res.status(200).json(deletedVideo)
        } catch (err) {
            return res.status(400).send({ error: "Video not found" })
        }
    },
    async watchVideo(req: Request, res: Response) {
        const { id } = req.params
        try {
            const video = await prisma.video.findUnique({ where: { id: id } })

            if (video === null) return res.status(404).json({ error: "Video not found" })

            const buffer = video.content
            const readable = new Readable()
            readable._read = () => { }
            readable.push(buffer)
            readable.push(null)

            readable.pipe(res)

        } catch (err) {
            return res.status(500).send({ error: "Error getting video" })
        }
    },
    //#endregion
}