import express from 'express'
import resultController from '../controllers/voteCandidate'
import endpoint from '../helpers/versionEndpoint'

const router = express.Router();

router.get(`${endpoint}:id/result`, resultController.vote);

export default router