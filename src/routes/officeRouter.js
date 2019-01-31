import express from 'express'
import officeController from '../controllers/officeController'
import officeValidator from '../middlewares/officeMiddleware'

const router = express.Router();

const versionedEndPoint = '/api/v1/office';

router.post(versionedEndPoint,officeValidator.createOffice ,officeController.createOffice);

export default router