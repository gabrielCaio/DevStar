import { Request, Response } from 'express'
import { prisma } from '../database/client'
import { VideoWithComments } from '../database/models/Video'

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
            console.log(err)
            return res.status(500).json({ error: "Error creating comment" })
        }
    },

    async listCommentsVideo(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const comments = await prisma.comments.findMany({ where: { videoId: id } })

            return res.json(comments)
        } catch (err) {
            return res.status(500).json({ error: "Server Error" })
        }
    },

    async listCommentsUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            const comments = await prisma.comments.findMany({ where: { authorId: id } })

            return res.json(comments)
        } catch (err) {
            return res.status(500).json({ error: "Error Getting comments"})
        }
    },
}