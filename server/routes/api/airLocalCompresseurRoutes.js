import express from 'express';
import {
  createAirLocalCompresseur,
  getAllAirLocalCompresseurs,
  getAirLocalCompresseurById,
  updateAirLocalCompresseur,
  deleteAirLocalCompresseur
} from '../../../controllers/airLocalCompresseurController.js';

const router = express.Router();

router.post('/air_localcompresseurs', createAirLocalCompresseur);
router.get('/air_localcompresseurs', getAllAirLocalCompresseurs);
router.get('/air_localcompresseurs/:id', getAirLocalCompresseurById);
router.put('/air_localcompresseurs/:id', updateAirLocalCompresseur);
router.delete('/air_localcompresseurs/:id', deleteAirLocalCompresseur);

export default router;
