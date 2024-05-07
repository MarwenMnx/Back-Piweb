import AirEquipment from '../models/airEquipmentModel.js';

export const createAirEquipment = async (req, res) => {
  try {
    const newAirEquipment = await AirEquipment.create(req.body);
    res.status(201).json({ message: 'Air equipment created successfully', airEquipment: newAirEquipment });
  } catch (error) {
    console.error('Error creating air equipment:', error);
    res.status(500).json({ error: 'Failed to create air equipment' });
  }
};

export const getAllAirEquipments = async (req, res) => {
  try {
    const airEquipments = await AirEquipment.find();
    res.status(200).json(airEquipments);
  } catch (error) {
    console.error('Error retrieving air equipments:', error);
    res.status(500).json({ error: 'Failed to retrieve air equipments' });
  }
};

export const getAirEquipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const airEquipment = await AirEquipment.findById(id);
    if (!airEquipment) {
      return res.status(404).json({ error: 'Air equipment not found' });
    }
    res.status(200).json(airEquipment);
  } catch (error) {
    console.error('Error retrieving air equipment:', error);
    res.status(500).json({ error: 'Failed to retrieve air equipment' });
  }
};

export const updateAirEquipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAirEquipment = await AirEquipment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedAirEquipment) {
      return res.status(404).json({ error: 'Air equipment not found' });
    }
    res.status(200).json({ message: 'Air equipment updated successfully', airEquipment: updatedAirEquipment });
  } catch (error) {
    console.error('Error updating air equipment:', error);
    res.status(500).json({ error: 'Failed to update air equipment' });
  }
};

export const deleteAirEquipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAirEquipment = await AirEquipment.findByIdAndDelete(id);
    if (!deletedAirEquipment) {
      return res.status(404).json({ error: 'Air equipment not found' });
    }
    res.status(200).json({ message: 'Air equipment deleted successfully', airEquipment: deletedAirEquipment });
  } catch (error) {
    console.error('Error deleting air equipment:', error);
    res.status(500).json({ error: 'Failed to delete air equipment' });
  }
};
