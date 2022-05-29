import { Request, Response } from 'express'
import { prisma } from '../database/client'
import { errorHandler } from '../middlewares/errorHandler'

export const commentController = {
    async createComment(req: Request, res: Response) {
        try {
            const { videoId, userId, comment } = req.body

            const newComment = await prisma.comments.create({
                data: {
                    author: { connect: { id: userId } },
                    video: { connect: { id: videoId }},
                    comment
                }
            })

            return res.json(newComment)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async listCommentsVideo(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const comments = await prisma.comments.findMany({ where: { videoId: id } })

            return res.json(comments)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async listCommentsUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            const comments = await prisma.comments.findMany({ where: { authorId: id } })

            return res.json(comments)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async listAllComments(req: Request, res: Response) {
        try {
            const comments = await prisma.comments.findMany()

            return res.json(comments)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async deleteComment(req: Request, res: Response) {
        try {
            const { userId } = req
            const { id } = req.params

            const auxComment = await prisma.comments.findUnique({ where: { id: id } })

            if(userId !== auxComment?.authorId) return res.status(401).send({ error: "User not authorized" })

            const aux = await prisma.comments.delete({ where: { id: id } })

            return res.status(204).json()
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },
}