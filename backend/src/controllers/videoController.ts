import { Request, Response } from 'express'
import { Multer } from '../services/multer'
import { prisma } from '../database/client'
import { Readable } from 'stream'
import { VideoNoBuffer } from '../database/models/Video'
import { errorHandler } from '../middlewares/errorHandler'

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
            return errorHandler(req, res, err)
        }
    },
    async createVideo(req: Request, res: Response) {
        try {
            const creatorId = req.userId

            const { title } = req.params
            const { buffer, size } = await Multer.singleVideo(req, res)

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
            return errorHandler(req, res, err)
        }
    },
    async deleteVideo(req: Request, res: Response) {
        try {
            const { id } = req.params

            const deleteVideo = await prisma.video.delete({ where: { id: id } })

            return res.status(204)
        } catch (err) {
            return errorHandler(req, res, err)
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
            return errorHandler(req, res, err)
        }
    },
    //#endregion
    
    //#region : Thumbnail
    async saveThumbnail(req: Request, res: Response) {
        try {
            const { id } = req.params

            const { buffer } = await Multer.singleImage(req, res)

            const video = await prisma.video.update({
                where: { id: id },
                data: { thumbnail: buffer, hasThumbnail: true }
            })

            const { thumbnail, content, ...data } = video

            return res.json(data)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },
    async showThumbnail(req: Request, res: Response) {
        try {
            const { id } = req.params

            const video = await prisma.video.findUnique({
                select: { thumbnail: true },
                where: { id: id },
            })

            if(video === null || video.thumbnail === null) return res.status(400).json({error: "Video not found"})

            return res.end(video.thumbnail)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },
    //#endregion

    async likeVideo(req: Request, res: Response) {
        try {
            const { videoId, userId } = req.body

            const video = await prisma.video.update({
                select: VideoNoBuffer,
                where: { id: videoId },
                data: { qntLikes: { increment: 1 }, likes: {create: {userId}} }
            })

            if(video === null) return res.status(400).json({ error: "Video not found" })

            return res.json(video);
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },
}