import { Request, Response } from 'express'
import { prisma } from '../dbClient'

export const postController = {
    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await prisma.post.findMany()
            return res.json(posts)
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },
    async createPost(req: Request, res: Response) {
        try {
            const { title, content, authorId } = req.body

            const post = await prisma.post.create({
                data: { title, content, authorId }
            })

            return res.json(post)
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },
}