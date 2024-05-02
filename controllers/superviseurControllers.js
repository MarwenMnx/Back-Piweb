import Superviseur from '../models/AirSuperviseur.js';

export const createSuperviseur = async (req, res) => {
  try {
    const superviseur = await Superviseur.create(req.body);
    res.status(201).json({ message: 'Superviseur created successfully', superviseur });
  } catch (error) {
    console.error('Error creating Superviseur:', error);
    res.status(500).json({ error: 'Failed to create Superviseur' });
  }
};

export const getAllSuperviseurs = async (req, res) => {
  try {
    const superviseurs = await Superviseur.find();
    res.status(200).json(superviseurs);
  } catch (error) {
    console.error('Error retrieving Superviseurs:', error);
    res.status(500).json({ error: 'Failed to retrieve Superviseurs' });
  }
};

export const getSuperviseurById = async (req, res) => {
  const { id } = req.params;
  try {
    const superviseur = await Superviseur.findById(id);
    if (!superviseur) {
      return res.status(404).json({ error: 'Superviseur not found' });
    }
    res.status(200).json(superviseur);
  } catch (error) {
    console.error('Error retrieving Superviseur:', error);
    res.status(500).json({ error: 'Failed to retrieve Superviseur' });
  }
};

export const updateSuperviseurById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSuperviseur = await Superviseur.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedSuperviseur) {
      return res.status(404).json({ error: 'Superviseur not found' });
    }
    res.status(200).json({
      message: 'Superviseur updated successfully',
      superviseur: updatedSuperviseur,
    });
  } catch (error) {
    console.error('Error updating Superviseur:', error);
    res.status(500).json({ error: 'Failed to update Superviseur' });
  }
};

export const deleteSuperviseurById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSuperviseur = await Superviseur.findByIdAndDelete(id);
    if (!deletedSuperviseur) {
      return res.status(404).json({ error: 'Superviseur not found' });
    }
    res.status(200).json({
      message: 'Superviseur deleted successfully',
      superviseur: deletedSuperviseur,
    });
  } catch (error) {
    console.error('Error deleting Superviseur:', error);
    res.status(500).json({ error: 'Failed to delete Superviseur' });
  }
};
