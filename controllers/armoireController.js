// controllers/armoireController.js
import Armoire from '../models/armoire.js';

// Create a new armoire
export const createArmoire = async (req, res) => {
  try {
    const newArmoire = new Armoire(req.body);
    const savedArmoire = await newArmoire.save();
    res.status(201).json({ message: 'Armoire created successfully', armoire: savedArmoire });
  } catch (error) {
    console.error('Error creating armoire:', error);
    res.status(500).json({ error: 'Failed to create armoire' });
  }
};

export const getAllArmoires = async (req, res) => {
  try {
    const armoires = await Armoire.find();
    res.status(200).json(armoires);
  } catch (error) {
    console.error('Error retrieving armoires:', error);
    res.status(500).json({ error: 'Failed to retrieve armoires' });
  }
};

// Retrieve an armoire by its ID
export const getArmoireById = async (req, res) => {
  const { id } = req.params;
  try {
    const armoire = await Armoire.findById(id);
    if (!armoire) {
      return res.status(404).json({ error: 'Armoire not found' });
    }
    res.status(200).json(armoire);
  } catch (error) {
    console.error('Error retrieving armoire:', error);
    res.status(500).json({ error: 'Failed to retrieve armoire' });
  }
};

// Update an armoire by its ID
export const updateArmoire = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedArmoire = await Armoire.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedArmoire) {
      return res.status(404).json({ error: 'Armoire not found' });
    }
    res.status(200).json({ message: 'Armoire updated successfully', armoire: updatedArmoire });
  } catch (error) {
    console.error('Error updating armoire:', error);
    res.status(500).json({ error: 'Failed to update armoire' });
  }
};

// Delete an armoire by its ID
export const deleteArmoire = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArmoire = await Armoire.findByIdAndDelete(id);
    if (!deletedArmoire) {
      return res.status(404).json({ error: 'Armoire not found' });
    }
    res.status(200).json({ message: 'Armoire deleted successfully', armoire: deletedArmoire });
  } catch (error) {
    console.error('Error deleting armoire:', error);
    res.status(500).json({ error: 'Failed to delete armoire' });
  }
};
