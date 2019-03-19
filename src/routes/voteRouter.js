import express from 'express'
import voteValidator from '../middlewares/voteMiddleware'
import voteController from '../controllers/voteCandidate'
import endpoint from '../helpers/versionEndpoint'
import aunthenticate from '../helpers/authentication';

const router = express.Router();

router.post(`${endpoint}votes`, aunthenticate.verifyUser,voteValidator.vote, voteController.vote)

export default router;