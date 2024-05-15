import express from "express";
import {
    createAirEquipment,
    getAllAirEquipments,
    getAirEquipmentById,
    updateAirEquipmentById,
    deleteAirEquipmentById
} from "../../../controllers/airEquipmentControllers.js";

const AirEquipmentRouter = express.Router();

AirEquipmentRouter.post("/", createAirEquipment);
AirEquipmentRouter.get("/", getAllAirEquipments);
AirEquipmentRouter.get("/:id", getAirEquipmentById);
AirEquipmentRouter.put("/:id", updateAirEquipmentById);
AirEquipmentRouter.delete("/:id", deleteAirEquipmentById);

export default AirEquipmentRouter;
