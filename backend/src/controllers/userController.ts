import { Request, Response } from 'express'
import { prisma } from '../database/client'
import { Multer } from '../services/multer'
import { cleanUser } from '../database/models/User'
import { generateToken } from '../services/jwt'
import { errorHandler } from '../middlewares/errorHandler'

export const userController = {
    async getUsers(req: Request, res: Response) {
        try {
            const allUsers = await prisma.user.findMany({ select: cleanUser })

            return res.json(allUsers)
        } catch (err) {
            return errorHandler(req, res, err)
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
            return errorHandler(req, res, err)
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const id = req.userId

            const user = await prisma.user.delete({ where: {id: id} })

            return res.status(204).json()
        }catch(err) {
            return errorHandler(req, res, err)
        }
    },

    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ select: cleanUser, where: {id: id} })

            return res.json(user)
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async saveAvatar(req: Request, res: Response) {
        try {
            const id = req.userId

            const { buffer } = await Multer.singleImage(req, res)

            const user = await prisma.user.update({
                where: { id: id },
                data: { avatar: buffer, hasAvatar: true }
            })

            const { avatar, ...data } = user

            return res.json(data)
        }catch (err) {
            return errorHandler(req, res, err)
        }
    },

    async getAvatar(req: Request, res: Response) {
        try {
            const { id } = req.params

            const user = await prisma.user.findUnique({ select: { avatar: true }, where: { id: id } })
            
            if(user === null || user.avatar === null) return res.send(400).json({ error: 'User not found, or avatar missing'})

            return res.end(user.avatar)
        }catch (err) {
            return errorHandler(req, res, err)
        }
    },
    
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await prisma.user.findUnique({ where: { email: email }})

            // Check if user exists
            if(user === null) return res.status(400).json({ error: 'User not found'})

            // Check password
            if(user.password !== password) return res.status(400).json({ error: 'Password incorrect'})

            // remove password
            const { password: pwd, ...data } = user

            // generateToken
            const token = generateToken({ id: user.id })

            // return user data and token
            return res.json({ data, token })
        } catch (err) {
            return errorHandler(req, res, err)
        }
    },
    
}