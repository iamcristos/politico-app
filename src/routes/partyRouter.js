import express from 'express';
import partyController from '../controllers/partyController';
import partyValidator from '../middlewares/partyMiddleware';

const router = express.Router();

const versionedEndPoint = '/api/v1/parties';

router.post(versionedEndPoint,partyValidator.createParty ,partyController.createParty);
router.get(versionedEndPoint, partyController.getAllParties);
router.get(`${versionedEndPoint}/:id`, partyController.getASpecificParty);
router.patch(`${versionedEndPoint}/:id`,partyValidator.editAParty, partyController.editAParty);
router.delete(`${versionedEndPoint}/:id`, partyController.deleteAParty);


export default router;
