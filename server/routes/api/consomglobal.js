// routes/airConsomglobalRoutes.js
import express from 'express';
import {
  getAllAirConsomglobal,
  getAirConsomglobalById,
  createAirConsomglobal,
  updateAirConsomglobal,
  deleteAirConsomglobal
} from '../../../controllers/airConsomGlobalController.js';

const airConsomglobalRouter = express.Router();

airConsomglobalRouter.post('/air_consomglobal', createAirConsomglobal);
airConsomglobalRouter.get('/air_consomglobal', getAllAirConsomglobal);
airConsomglobalRouter.get('/air_consomglobal/:id', getAirConsomglobalById);
airConsomglobalRouter.put('/air_consomglobal/:id', updateAirConsomglobal);
airConsomglobalRouter.delete('/air_consomglobal/:id', deleteAirConsomglobal);

export default airConsomglobalRouter;