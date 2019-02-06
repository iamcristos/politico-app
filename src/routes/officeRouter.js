import express from 'express'
import officeController from '../controllers/officeController'
import officeValidator from '../middlewares/officeMiddleware'
import authenticate from '../helpers/authentication'

const router = express.Router();

const versionedEndPoint = '/api/v1/offices';

router.post(versionedEndPoint,authenticate,officeValidator.createOffice ,officeController.createOffice);
router.get(versionedEndPoint,authenticate ,officeValidator.getAllOffice, officeController.getAllOffice);
router.get(`${versionedEndPoint}/:id`, authenticate,officeController.getASpecificOffice);

export default router