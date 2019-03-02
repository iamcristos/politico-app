import express from 'express'
import candidateValidator from '../middlewares/candidateMiddleware'
import candidateController from '../controllers/createCandidate'
import endpoint from '../helpers/versionEndpoint'
import authenticate from '../helpers/authentication'

const router = express.Router();

router.post(`${endpoint}office/:id/register`, authenticate.verifyToken,candidateValidator.createCandidate, candidateController.createCandidate)
// router.get(`${endpoint}office/:id/register`, candidateController.getCandidate)
router.get(`${endpoint}office/register`, candidateController.getCandidate)

export default router;