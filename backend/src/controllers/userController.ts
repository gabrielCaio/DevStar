import { Request, Response } from 'express'
import { prisma } from '../database/client'
import { Multer } from '../services/multer'

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
    async saveAvatar(req: Request, res: Response) {
        try {
            const { id } = req.params

            const { buffer } = await Multer.singleImage(req, res)

            const user = await prisma.user.update({
                where: { id: id },
                data: { avatar: buffer }
            })

            return res.json(user)
        }catch (err) {
            return res.status(500).json({ error: "Error saving avatar"})
        }
    },
    async getAvatar(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ select: { avatar: true }, where: { id: id } })
            
            if(user === null || user.avatar === null) return res.send(400).json({ error: 'User not found, or avatar missing'})

            const { avatar } = user

            return res.end(avatar)
        }catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error getting avatar"})
        }
    },
}