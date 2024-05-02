import AirLocalCompresseur from '../models/airLocalCompresseur.js';

export const createAirLocalCompresseur = async (req, res) => {
  try {
    const newAirLocalCompresseur = new AirLocalCompresseur(req.body);
    const savedAirLocalCompresseur = await newAirLocalCompresseur.save();
    res.status(201).json(savedAirLocalCompresseur);
  } catch (error) {
    console.error('Error creating air local compresseur:', error);
    res.status(500).json({ error: 'Failed to create air local compresseur' });
  }
};

export const getAllAirLocalCompresseurs = async (req, res) => {
  try {
    const airLocalCompresseurs = await AirLocalCompresseur.find();
    res.status(200).json(airLocalCompresseurs);
  } catch (error) {
    console.error('Error retrieving air local compresseurs:', error);
    res.status(500).json({ error: 'Failed to retrieve air local compresseurs' });
  }
};

export const getAirLocalCompresseurById = async (req, res) => {
  const { id } = req.params;
  try {
    const airLocalCompresseur = await AirLocalCompresseur.findById(id);
    if (!airLocalCompresseur) {
      return res.status(404).json({ error: 'Air local compresseur not found' });
    }
    res.status(200).json(airLocalCompresseur);
  } catch (error) {
    console.error('Error retrieving air local compresseur:', error);
    res.status(500).json({ error: 'Failed to retrieve air local compresseur' });
  }
};

export const updateAirLocalCompresseur = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAirLocalCompresseur = await AirLocalCompresseur.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedAirLocalCompresseur) {
      return res.status(404).json({ error: 'Air local compresseur not found' });
    }
    res.status(200).json({
      message: 'Air local compresseur updated successfully',
      airLocalCompresseur: updatedAirLocalCompresseur,
    });
  } catch (error) {
    console.error('Error updating air local compresseur:', error);
    res.status(500).json({ error: 'Failed to update air local compresseur' });
  }
};

export const deleteAirLocalCompresseur = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAirLocalCompresseur = await AirLocalCompresseur.findByIdAndDelete(id);
    if (!deletedAirLocalCompresseur) {
      return res.status(404).json({ error: 'Air local compresseur not found' });
    }
    res.status(200).json({
      message: 'Air local compresseur deleted successfully',
      airLocalCompresseur: deletedAirLocalCompresseur,
    });
  } catch (error) {
    console.error('Error deleting air local compresseur:', error);
    res.status(500).json({ error: 'Failed to delete air local compresseur' });
  }
};
