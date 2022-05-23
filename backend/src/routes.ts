import { Request, Response, Router } from 'express'
const router = Router()

import { userController } from './controllers/userController'
import { postController } from './controllers/postController'
import { videoController } from './controllers/videoController'

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

// Video
router.post('/video/create', videoController.createVideo)
router.get('/video/listall', videoController.listall)

export default router