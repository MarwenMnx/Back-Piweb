import express from "express";
import {
    getAllAirEntretiens,
    createAirEntretien,
    getAirEntretienById,
    updateAirEntretien,
    deleteAirEntretien,
    insertAll,
} from "../../../controllers/airEntretienControllers.js";

const AirEntretienRouter = express.Router();

AirEntretienRouter.post("/", createAirEntretien);
AirEntretienRouter.get("/", getAllAirEntretiens);
AirEntretienRouter.post("/all", insertAll);
AirEntretienRouter.get("/:id", getAirEntretienById);
AirEntretienRouter.put("/:id", updateAirEntretien);
AirEntretienRouter.delete("/:id", deleteAirEntretien);

export default AirEntretienRouter;
