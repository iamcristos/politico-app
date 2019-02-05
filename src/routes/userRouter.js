import express from 'express'
import userController from '../controllers/userController';
import userMiddleware from '../middlewares/userMiddleware'

const userRouter = express.Router()

const versionedEndPoint = '/api/v1/users'

userRouter.post(versionedEndPoint,userMiddleware.signUpValidate ,userController.userSignup)

export default userRouter