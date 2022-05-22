import { Request, Response, Router } from 'express'
const router = Router()

import { userController } from './controllers/userController'
import { postController } from './controllers/postController'

// Test
router.get('/', (req: Request, res: Response) => {
    res.json({ message: "Server is Working!!!" })
})

// User
router.post('/user/create', userController.createUser)
router.get('/user/listall',userController.getUsers)

// Post
router.post('/post/create', postController.createPost)
router.get('/post/listall', postController.getAllPosts)

export default router