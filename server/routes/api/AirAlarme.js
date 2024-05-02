import express from 'express';
import{
  postEmail,
post,
get,
getById,
putById,
deleteById,

putIdVue,
getByEquipementId,
postCall,
postSms
} from '../../../controllers/airAlarmeController.js';
const alarmeRouter = express.Router();
alarmeRouter.post('/envoyer-sms', postSms);
alarmeRouter.post('/envoyer-email', postEmail);
alarmeRouter.post('/make-call', postCall);
alarmeRouter.post('/add', post);
alarmeRouter.get('/get', get);

alarmeRouter.get('/get/:id', getById);
alarmeRouter.put('/put/:id', putById);
alarmeRouter.delete('/delete/:id', deleteById);
alarmeRouter.put('/:id/vue', putIdVue);
alarmeRouter.get('/equipements/:equipementId/airalarmes', getByEquipementId);

export default alarmeRouter;
