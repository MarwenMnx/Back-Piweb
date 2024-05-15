import express from 'express';
import {
  createArmoire,
  getAllArmoires,
  getArmoireById,
  updateArmoire,
  deleteArmoire
} from '../../../controllers/armoireController.js'; 

const router = express.Router();
router.post('/armoires', createArmoire);
router.get('/armoires', getAllArmoires);
router.get('/armoires/:id', getArmoireById);

// Route to update an armoire
router.put('/armoires/:id', updateArmoire);

// Route to delete an armoire
router.delete('/armoires/:id', deleteArmoire);

export default router;
