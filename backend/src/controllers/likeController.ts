import { Request, Response } from 'express'
import { prisma } from '../database/client'
import { errorHandler } from '../middlewares/errorHandler'

export const likeController = {
    async listAll(req: Request, res: Response) {
        try {
            const likes = await prisma.likes.findMany({})

            return res.json(likes)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async likeVideo(req: Request, res: Response) {
        try {
            const { userId } = req
            const { videoId } = req.body

            const like = prisma.likes.create({
                data: {
                    userId: userId,
                    videoId: videoId,
                }
            })

            const incrementLike = prisma.video.update({
                where: { id: videoId },
                data: { qntLikes: { increment: 1 } }
            })

            await prisma.$transaction([ like, incrementLike ])

            return res.status(204).json()
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async dislikeVideo(req: Request, res: Response) {
        try {
            const { userId } = req
            const { videoId } = req.body

            const dislike = prisma.likes.delete({
                where: {
                    videoId_userId: { userId, videoId }
                }
            })

            const decrementLike = prisma.video.update({
                where: { id: videoId },
                data: { qntLikes: { decrement: 1 }}
            })

            await prisma.$transaction([dislike, decrementLike])

            return res.status(204).json()
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async getLikesFromVideo(req: Request, res: Response) {
        try {
            const { id } = req.params

            const likes = await prisma.likes.findMany({ where: { videoId: id } })

            const count = likes.length

            return res.json({ likes, count })
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async getLikesFromUser(req: Request, res: Response) {
        try {
            const { userId } = req

            const likes = await prisma.likes.findMany({ where: { userId } })

            return res.json(likes)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },
}