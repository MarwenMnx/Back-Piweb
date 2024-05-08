import express from 'express';
import{getIA } from '../../../controllers/pythonControllerInes.js';

const pythonRouter = express.Router();
pythonRouter.get('/dashboard', getIA);
export default pythonRouter;
