import { Request, Response, Router } from 'express'
const router = Router()

import { userController } from './controllers/userController'
import { videoController } from './controllers/videoController'
import { commentController } from './controllers/commentController'
import { authUser } from './middlewares/authUser'

// Test
router.get('/', (req: Request, res: Response) => res.json({ message: "Server is Working!!!" }))

// -------------- User ------------------

router.post('/user/create', userController.createUser)
router.delete('/user/delete', authUser, userController.deleteUser)
router.get('/user/listall',userController.getUsers)
router.get('/user/get/:id', userController.getUser)
router.post('/user/login', userController.login)

router.patch('/user/saveAvatar', authUser, userController.saveAvatar)
router.get('/user/getAvatar/:id', userController.getAvatar)
router.get('/user/videosLiked/:id', userController.getVideosLiked)


// --------------- Video -------------------

router.post('/video/create/:title', authUser, videoController.createVideo)
router.get('/video/listall', videoController.listall)
router.get('/video/watch/:id', videoController.watchVideo)
router.delete('/video/delete/:id', authUser, videoController.deleteVideo)

router.patch('/video/saveThumbnail/:id', authUser, videoController.saveThumbnail)
router.get('/video/showThumbnail/:id', videoController.showThumbnail)
router.patch('/video/like', videoController.likeVideo)


// ------------------ Comments ----------------------

router.post('/comment/create', authUser, commentController.createComment)
router.get('/comment/listVideo/:id', commentController.listCommentsVideo)
router.get('/comment/listUser/:id', commentController.listCommentsUser)
router.get('/comment/listAll', commentController.listAllComments)
router.delete('/comment/delete', authUser, commentController.deleteComment)

export default router