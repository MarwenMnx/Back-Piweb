import dotenv from 'dotenv';
// Require npm modules
import express from 'express';
import helmet from 'helmet';
import  bodyParser from 'body-parser';
import  cors  from 'cors';
import  mongoose from 'mongoose';

import alarmeRouter from './routes/api/AirAlarme.js';
import typealarmeRouter from './routes/api/Air_Typealarme.js';
import usineRouter from './routes/api/Usine.js';


dotenv.config();

// Initialize app
const app = express();

const { PORT = 5000 ,dbpassword} = process.env;
// Initialize middleware
app.use(helmet());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(express.static('./dist/'));


// Use routes
app.use('/api/airalarmes', alarmeRouter);
app.use('/api/airTypeAlarme', typealarmeRouter);
app.use('/api/usine', usineRouter);



app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});


const CONNECTION_URL = `mongodb+srv://ineslachkhem:piwebines@cluster0.kmdgs4p.mongodb.net/`;
mongoose.connect(CONNECTION_URL, {  })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) )
.catch((error) => console.log(error.message));


