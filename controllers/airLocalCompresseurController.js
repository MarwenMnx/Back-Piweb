import AirLocalCompresseur from '../models/Airlocalcompressor.js';

export const addAirLocalCompresseur = async (req, res) => {
  try {
    const { id, nom, description, dossier, dossierprod } = req.body;

    const newAirLocalCompresseur = new AirLocalCompresseur({
      id,
      nom,
      description,
      dossier,
      dossierprod
    });

    await newAirLocalCompresseur.save();

    res.status(201).json({ message: 'AirLocalCompresseur added successfully', data: newAirLocalCompresseur });
  } catch (error) {
    res.status(500).json({ message: 'Error adding AirLocalCompresseur', error: error.message });
  }
};
