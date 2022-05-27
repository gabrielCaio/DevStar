import { Request, Response } from 'express'
import { prisma } from '../database/client'
import { VideoWithComments } from '../database/models/Video'

export const commentController = {
    async createComment(req: Request, res: Response) {
        try {
            const { videoId, userId, comment } = req.body

            const newComment = await prisma.video.update({
                select: VideoWithComments,
                where: { id: videoId },
                data: {
                    comments: { 
                        create: {
                            comment,
                            author: { connect: userId },
                        } 
                    },
                    qntComments: { increment: 1 }
                }
            })

            return res.json(newComment)
        } catch (err) {
            return res.status(500).json({ error: "Error creatin comment" })
        }
    },
}