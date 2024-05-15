// airEntretienControllers.js


import AirEntretien from "../models/airEntretienModel.js";
import fs from "fs";

// Create a new AirEntretien
export const createAirEntretien = async (req, res) => {
    try {
        const airEntretien = await AirEntretien.create(req.body);
        res.status(201).json(airEntretien);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all AirEntretiens
export const getAllAirEntretiens = async (req, res) => {
    try {
        const airEntretiens = await AirEntretien.find();
        res.status(200).json(airEntretiens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific AirEntretien by ID
export const getAirEntretienById = async (req, res) => {
    try {
        const airEntretien = await AirEntretien.findById(req.params.id);
        if (!airEntretien) {
            return res.status(404).json({ message: "AirEntretien not found" });
        }
        res.status(200).json(airEntretien);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a specific AirEntretien by ID
export const updateAirEntretien = async (req, res) => {
    try {
        const updatedAirEntretien = await AirEntretien.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedAirEntretien);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a specific AirEntretien by ID


export const insertAll = async (req, res) => {
    try {
        // Read the JSON file
        const data = JSON.parse(
            fs.readFileSync("generated-data-2.json", "utf-8")
        );

        // Loop through each object and add them one by one
        for (const item of data) {
            // Create a new document using your Mongoose model
            const airEquipment = await AirEntretien.create(item);
            // Save the document to the database
            console.log("Data added successfully:", airEquipment);
        }
        res.status(200).json({ message: "AirEquipments add successfully" });

        console.log("All data added successfully.");
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ message: "Error adding data" });
    }
};
