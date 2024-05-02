import axios from 'axios';

const predictionController = {
  predict: async (req, res) => {
    try {
      const { heurefonction, temperature, pointderose, tauxdecharge, debit, production } = req.body;
      const data = {
        heurefonction,
        temperature,
        pointderose,
        tauxdecharge,
        debit,
        production,
      };
      
      const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', data);
      const { pression_1, pression_2 } = flaskResponse.data;
      res.json({ pression_1, pression_2 });
  
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({ message: 'Connection refused: Flask API is not running or listening at localhost:5000' });
      } else {
        console.error(error);
        res.status(500).json({ message: 'Internal server error 5000000' });
      }
    }
  },
};

export default predictionController;
