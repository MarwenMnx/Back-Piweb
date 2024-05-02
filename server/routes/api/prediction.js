import express from 'express';
import predictionController from '../../../controllers/predictionController.js';
const predictionRouter = express.Router();

predictionRouter.post('/predict', predictionController.predict);

export default predictionRouter;


