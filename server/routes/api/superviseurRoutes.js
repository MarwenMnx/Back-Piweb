import express from 'express';
import {
    getAllSuperviseurs,
    createSuperviseur,
    getSuperviseurById,
    updateSuperviseurById,
    deleteSuperviseurById,
} from '../../../controllers/superviseurControllers.js';

const router = express.Router();

router.post("/", createSuperviseur);
router.get("/", getAllSuperviseurs);
router.get("/:id", getSuperviseurById);
router.put("/:id", updateSuperviseurById);
router.delete("/:id", deleteSuperviseurById);

export default router;
