import express from 'express'
import userController from '../controllers/userController';
import userMiddleware from '../middlewares/userMiddleware'

const userRouter = express.Router()

const versionedEndPoint = '/api/v1/users'

userRouter.post(`${versionedEndPoint}/signup`,userMiddleware.signUpValidate ,userController.userSignup);
userRouter.post(`${versionedEndPoint}/login`, userMiddleware.signInValidate ,userController.userSignin)

export default userRouter