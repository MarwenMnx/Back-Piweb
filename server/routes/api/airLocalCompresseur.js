import express from 'express';
import { addAirLocalCompresseur } from '../../../controllers/airLocalCompresseurController.js';

const airLocalCompresseurRouter = express.Router();

// Route to add AirLocalCompresseur
airLocalCompresseurRouter.post('/', addAirLocalCompresseur);

export default airLocalCompresseurRouter;
