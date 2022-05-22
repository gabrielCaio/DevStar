import { Request, Response } from 'express'
import { prisma } from '../dbClient'

export const userController = {
    async getUsers(req: Request, res: Response) {
        try {
            const allUsers = await prisma.user.findMany()

            return res.json(allUsers)
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },
    async createUser(req: Request, res: Response) {
        try {
            const { name } = req.body

            const user = await prisma.user.create({
                data: { name }
            })

            return res.json(user)
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },
}