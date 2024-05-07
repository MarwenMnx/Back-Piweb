// routes/airConsomglobalRoutes.js
import express from 'express';
import {
  getAllAirConsomglobal,
  getAirConsomglobalById,
  createAirConsomglobal,
  updateAirConsomglobal,
  deleteAirConsomglobal
} from '../../../controllers/airConsomglobalController.js';

const router = express.Router();

router.post('/air_consomglobal', createAirConsomglobal);
router.get('/air_consomglobal', getAllAirConsomglobal);
router.get('/air_consomglobal/:id', getAirConsomglobalById);
router.put('/air_consomglobal/:id', updateAirConsomglobal);
router.delete('/air_consomglobal/:id', deleteAirConsomglobal);

export default router;
