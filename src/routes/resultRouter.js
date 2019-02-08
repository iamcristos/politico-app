import express from 'express'
import resultController from '../controllers/resultController'
import endpoint from '../helpers/versionEndpoint'
import aunthenticate from '../helpers/authentication';

const router = express.Router();

router.get(`${endpoint}:id/result`, resultController.viewResult);

export default router