import express from 'express';
import AirTypeAlarme from '../../../models/air_typealarme.js'; 

const typealarmeRouter = express.Router();

// **Create (POST)**
typealarmeRouter.post('/', async (req, res) => {
  try {
    const { id, nom, description } = req.body;
    const airTypeAlarme = new AirTypeAlarme({ id, nom, description });
    await airTypeAlarme.save();
    res.status(201).json(airTypeAlarme); // Respond with created air type alarme and status code 201 (Created)
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message }); // Respond with error message and status code 400 (Bad Request)
  }
});

// **Read (GET)**

// Get all air type alarmes
typealarmeRouter.get('/', async (req, res) => {
  try {
    const airTypeAlarmes = await AirTypeAlarme.find();
    res.json(airTypeAlarmes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching air type alarmes' }); // Respond with generic error message and status code 500 (Internal Server Error)
  }
});

// Get air type alarme by ID
typealarmeRouter.get('/:id', async (req, res) => {
  try {
    const airTypeAlarme = await AirTypeAlarme.findById(req.params.id);
    if (!airTypeAlarme) {
      return res.status(404).json({ error: 'Air type alarme not found' }); // Respond with error message and status code 404 (Not Found)
    }
    res.json(airTypeAlarme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching air type alarme' });
  }
});

// **Update (PUT)**
typealarmeRouter.put('/:id', async (req, res) => {
  try {
    const { id, nom, description } = req.body;
    const updatedAirTypeAlarme = await AirTypeAlarme.findByIdAndUpdate(
      req.params.id,
      { id, nom, description },
      { new: true } // Return the updated document
    );
    if (!updatedAirTypeAlarme) {
      return res.status(404).json({ error: 'Air type alarme not found' });
    }
    res.json(updatedAirTypeAlarme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating air type alarme' });
  }
});

// **Delete (DELETE)**
typealarmeRouter.delete('/:id', async (req, res) => {
  try {
    const deletedAirTypeAlarme = await AirTypeAlarme.findByIdAndDelete(req.params.id);
    if (!deletedAirTypeAlarme) {
      return res.status(404).json({ error: 'Air type alarme not found' });
    }
    res.json({ message: 'Air type alarme deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting air type alarme' });
  }
});

export default typealarmeRouter;

