import express from 'express'
import userController from '../controllers/userController';
import userMiddleware from '../middlewares/userMiddleware';
import endpoint from '../helpers/versionEndpoint'

const userRouter = express.Router()

userRouter.post(`${endpoint}auth/signup`,userMiddleware.signUpValidate ,userController.userSignup);
userRouter.post(`${endpoint}auth/login`, userMiddleware.signInValidate ,userController.userSignin);
userRouter.get(`${endpoint}users`, userController.getAllUsers);
userRouter.get(`${endpoint}users/:id`, userController.getAUser)

export default userRouter