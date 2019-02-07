import express from 'express'
import officeController from '../controllers/officeController'
import officeValidator from '../middlewares/officeMiddleware'
import authenticate from '../helpers/authentication'

const router = express.Router();

const versionedEndPoint = '/api/v1/offices';

router.post(versionedEndPoint,officeValidator.createOffice ,officeController.createOffice);
router.get(versionedEndPoint,officeValidator.getAllOffice, officeController.getAllOffice);
router.get(`${versionedEndPoint}/:id`, officeController.getASpecificOffice);

export default router