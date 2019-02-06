import express from 'express'
import voteValidator from '../middlewares/voteMiddleware'
import voteController from '../controllers/voteCandidate'
import endpoint from '../helpers/versionEndpoint'

const router = express.Router();

router.post(`${endpoint}votes`, voteValidator.vote, voteController.vote)

export default router;