import express from 'express'
import candidateValidator from '../middlewares/candidateMiddleware'
import candidateController from '../controllers/createCandidate'
import endpoint from '../helpers/versionEndpoint'

const router = express.Router();
console.log(endpoint)

router.post(`${endpoint}office/:id/register`, candidateValidator.createCandidate, candidateController.createCandidate)

export default router;