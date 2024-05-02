import express from 'express';
import Usine from '../../../models/usine.js';
const usineRouter = express.Router();

// Créer (POST)
usineRouter.post('/', async (req, res) => {
  try {
    const { nom, objectifUsine } = req.body;
    const usine = new Usine({ nom, objectifUsine });
    await usine.save();
    res.status(201).json(usine);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Lire (GET)
// Obtenir toutes les usines
usineRouter.get('/', async (req, res) => {
  try {
    const usines = await Usine.find();
    res.json(usines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching usines' });
  }
});

// Obtenir une usine par son ID
usineRouter.get('/:id', async (req, res) => {
  try {
    const usine = await Usine.findById(req.params.id);
    if (!usine) {
      return res.status(404).json({ error: 'Usine not found' });
    }
    res.json(usine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching usine' });
  }
});

// Mettre à jour (PUT)
usineRouter.put('/:id', async (req, res) => {
  try {
    const { nom, objectifUsine } = req.body;
    const updatedUsine = await Usine.findByIdAndUpdate(
      req.params.id,
      { nom, objectifUsine },
      { new: true } // Retourner le document mis à jour
    );
    if (!updatedUsine) {
      return res.status(404).json({ error: 'Usine not found' });
    }
    res.json(updatedUsine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating usine' });
  }
});

// Supprimer (DELETE)
usineRouter.delete('/:id', async (req, res) => {
  try {
    const deletedUsine = await Usine.findByIdAndDelete(req.params.id);
    if (!deletedUsine) {
      return res.status(404).json({ error: 'Usine not found' });
    }
    res.json({ message: 'Usine deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting usine' });
  }

});
//Obtenir la liste de toutes les usines 
usineRouter.get('/usines', async (req, res) => {
  try {
    const usines = await Usine.find();
    res.status(200).json(usines);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des usines.' });
  }
});
//Obtenir les détails d'une usine spécifique en fonction de son ID
usineRouter.get('/usine/:id', async (req, res) => {
  try {
    const usine = await Usine.findById(req.params.id);
    if (!usine) {
      return res.status(404).json({ error: 'Usine non trouvée.' });
    }
    res.status(200).json(usine);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des détails de l\'usine.' });
  }
});

export default usineRouter;
