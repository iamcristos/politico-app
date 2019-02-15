import express from 'express'
import candidateValidator from '../middlewares/candidateMiddleware'
import candidateController from '../controllers/createCandidate'
import endpoint from '../helpers/versionEndpoint'
import authenticate from '../helpers/authentication'

const router = express.Router();

router.post(`${endpoint}office/:id/register`, authenticate.verifyToken,candidateValidator.createCandidate, candidateController.createCandidate)

export default router;