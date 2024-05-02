/*import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongooimport config from '../config/config.js'; 

import machineRoutes from './routes/api/machineRoutes.js';
import armoireRoutes from './routes/api/armoireRoutes.js'; 
import factureRoutes from './routes/api/factureRoutes.js';
dote
import airConsomglobalRoutes from './routes/api/airConsomglobalRoutes.js'; // Adjust the path as per your directory structure
nv.config();

const app = express();
const { PORT = 5000, dbpassword } = process.env;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./dist/'));

//app.use('/api/airalarmes', alarmeRouter);
//app.use('/api/airTypeAlarme', typealarmeRouter);
//app.use('/api/usine', usineRouter);
app.use('/api/entretiens', entretienRouter);
//app.use('/api/equipements', equipementRouter);
app.use('/api/airspvs', airspvsRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.app.use('/air_consomglobal', airConsomglobalRoutes);
get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

const { uri, username, password, dbName } = config.mongo;

mongoose.connect(`mongodb+srv://${username}:${password}@${uri}/${dbName}`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to log outgoing responses
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  .catch((error) => console.log(error.message));

*/