import { Request, Response } from 'express'
import { prisma } from '../database/client'

export const userController = {
    //#region : CRUD User
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
    // FIXME: not delete user and only mark him with isDeleted = true
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.delete({ where: {id: id} })

            return res.json(user)
        }catch(err) {
            console.log(err)
            return res.status(400).json({ error: "User not found" })
        }
    },
    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ where: {id: id} })

            return res.json(user)
        } catch (err) {
            return res.status(404).json({ error: "User not found"})
        }
    },
    //#endregion
}