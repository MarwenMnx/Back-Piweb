import AirConsomglobal from '../models/AirConsomglobal.js'; // Adjust the path as per your directory structure

// Get all air_consomglobal
export const getAllAirConsomglobal = async (req, res) => {
    try {
      const airConsomglobal = await AirConsomglobal.find();
      res.json(airConsomglobal);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

// Get a single air_consomglobal by ID
export const getAirConsomglobalById = async (req, res) => {
    try {
      const airConsomglobal = await AirConsomglobal.findById(req.params.id);
      if (!airConsomglobal) {
        return res.status(404).json({ message: 'Air consomglobal not found' });
      }
      res.json(airConsomglobal);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

// Create a new air_consomglobal
export const createAirConsomglobal = async (req, res) => {
    const airConsomglobal = new AirConsomglobal(req.body);
    try {
      const newAirConsomglobal = await airConsomglobal.save();
      res.status(201).json(newAirConsomglobal);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

// Update an existing air_consomglobal
export const updateAirConsomglobal = async (req, res) => {
    try {
      const updatedAirConsomglobal = await AirConsomglobal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedAirConsomglobal) {
        return res.status(404).json({ message: 'Air consomglobal not found' });
      }
      res.json(updatedAirConsomglobal);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

// Delete an air_consomglobal
export const deleteAirConsomglobal = async (req, res) => {
    try {
      const airConsomglobal = await AirConsomglobal.findByIdAndDelete(req.params.id);
      if (!airConsomglobal) {
        return res.status(404).json({ message: 'Air consomglobal not found' });
      }
      res.json({ message: 'Air consomglobal deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
