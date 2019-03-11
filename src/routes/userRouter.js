import express from 'express'
import userController from '../controllers/userController';
import userMiddleware from '../middlewares/userMiddleware';
import endpoint from '../helpers/versionEndpoint';
import multerStorage from '../middlewares/multer'

const userRouter = express.Router()
const parser = multerStorage.single('passportUrl')
userRouter.post(`${endpoint}auth/signup`,userMiddleware.signUpValidate,parser,userController.userSignup);
userRouter.post(`${endpoint}auth/login`, userMiddleware.signInValidate ,userController.userSignin);
userRouter.get(`${endpoint}users`, userController.getAllUsers);
userRouter.get(`${endpoint}users/:id`, userController.getAUser)

export default userRouter