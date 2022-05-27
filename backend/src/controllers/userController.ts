import { Request, Response } from 'express'
import { prisma } from '../database/client'
import { Multer } from '../services/multer'
import { cleanUser } from '../database/models/User'
import { generateToken } from '../services/jwt'

export const userController = {
    //#region : CRUD User
    async getUsers(req: Request, res: Response) {
        try {
            const allUsers = await prisma.user.findMany({ select: cleanUser })

            return res.json(allUsers)
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },
    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body

            const user = await prisma.user.create({
                data: { name, email, password }
            })

            return res.json(user)
        } catch (err) {
            return res.status(400).json({ error: err })
        }
    },
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.delete({ where: {id: id} })

            return res.status(204)
        }catch(err) {
            console.log(err)
            return res.status(400).json({ error: "User not found" })
        }
    },
    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ select: cleanUser, where: {id: id} })

            return res.json(user)
        } catch (err) {
            return res.status(404).json({ error: "User not found"})
        }
    },
    //#endregion

    //#region : Avatar
    async saveAvatar(req: Request, res: Response) {
        try {
            const { id } = req.params

            const { buffer } = await Multer.singleImage(req, res)

            const user = await prisma.user.update({
                where: { id: id },
                data: { avatar: buffer, hasAvatar: true }
            })

            const { avatar, ...data } = user

            return res.json(data)
        }catch (err) {
            return res.status(500).json({ error: "Error saving avatar"})
        }
    },
    async getAvatar(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ select: { avatar: true }, where: { id: id } })
            
            if(user === null || user.avatar === null) return res.send(400).json({ error: 'User not found, or avatar missing'})

            return res.end(user.avatar)
        }catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error getting avatar"})
        }
    },
    //#endregion

    async getVideosLiked(req: Request, res: Response) {
        try {
            const { id } = req.params

            const videosLiked = await prisma.likes.findMany({
                select: { videoId: true },
                where: { userId: id },
            })

            return res.json(videosLiked)
        } catch (err) {
            return res.status(500).json({ error: "Server Error"})
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await prisma.user.findUnique({ where: { email: email }})

            if(user === null) return res.status(400).json({ error: 'User not found'})

            if(user.password !== password) return res.status(400).json({ error: 'Password incorrect'})

            const { password: pwd, ...data } = user

            const token = generateToken({ id: user.id })

            return res.json({ user, token })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Login Error" })
        }
    },

}