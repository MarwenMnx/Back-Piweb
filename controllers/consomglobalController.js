import Consomglobal from '../server/models/Consomglobal.js';

// Controller function to add new consomglobal data
export const addConsomglobalData = async (req, res) => {
  try {
    // Create a new instance of Consomglobal model with request body
    const newConsomglobal = new Consomglobal(req.body);
    // Save the new document to the database
    await newConsomglobal.save();
    // Respond with the newly created document
    res.status(201).json(newConsomglobal);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
