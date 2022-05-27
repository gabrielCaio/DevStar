import { Request, Response, Router } from 'express'
const router = Router()

import { userController } from './controllers/userController'
import { videoController } from './controllers/videoController'

// Test
router.get('/', (req: Request, res: Response) => {
    res.json({ message: "Server is Working!!!" })
})

// User
router.post('/user/create', userController.createUser)
router.get('/user/listall',userController.getUsers)
router.get('/user/get/:id', userController.getUser)
router.patch('/user/saveAvatar/:id', userController.saveAvatar)
router.get('/user/getAvatar/:id', userController.getAvatar)
// FIXME: fix this route
// router.delete('/user/delete/:id', userController.deleteUser)

// Video
router.post('/video/create/:id/:title', videoController.createVideo)
router.get('/video/listall', videoController.listall)
router.get('/video/watch/:id', videoController.watchVideo)
router.delete('/video/delete/:id', videoController.deleteVideo)

export default router