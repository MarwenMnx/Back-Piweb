import express from 'express';
import {
  createAirLocalCompresseur,
  getAllAirLocalCompresseurs,
  getAirLocalCompresseurById,
  updateAirLocalCompresseur,
  deleteAirLocalCompresseur
} from '../../../controllers/airLocalCompresseurController.js';

const airLocompRouter = express.Router();

airLocompRouter.post('/air_localcompresseurs', createAirLocalCompresseur);
airLocompRouter.get('/air_localcompresseurs', getAllAirLocalCompresseurs);
airLocompRouter.get('/air_localcompresseurs/:id', getAirLocalCompresseurById);
airLocompRouter.put('/air_localcompresseurs/:id', updateAirLocalCompresseur);
airLocompRouter.delete('/air_localcompresseurs/:id', deleteAirLocalCompresseur);

export default airLocompRouter;
