import express from 'express';
import { addConsomglobalData } from '../../../controllers/consomglobalController.js';

const consomglobalRouter = express.Router();

// Route to add consomglobal data
consomglobalRouter.post('/', addConsomglobalData);

export default consomglobalRouter;
