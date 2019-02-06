import express from 'express';
import partyController from '../controllers/partyController';
import partyValidator from '../middlewares/partyMiddleware';
import authenticate from '../helpers/authentication'

const router = express.Router();

const versionedEndPoint = '/api/v1/parties';

router.post(versionedEndPoint, authenticate,partyValidator.createParty , partyController.createParty);
router.get(versionedEndPoint, authenticate, partyController.getAllParties);
router.get(`${versionedEndPoint}/:id`, authenticate, partyController.getASpecificParty);
router.patch(`${versionedEndPoint}/:id`, authenticate,partyValidator.editAParty, partyController.editAParty);
router.delete(`${versionedEndPoint}/:id`, authenticate,partyController.deleteAParty);


export default router;
