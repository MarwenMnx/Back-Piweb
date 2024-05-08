import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.js'; 

import machineRoutes from './server/routes/api/machineRoutes.js';
import armoireRoutes from './server/routes/api/armoireRoutes.js'; 
import factureRoutes from './server/routes/api/factureRoutes.js';

import alarmeRouter from './server/routes/api/AirAlarme.js';
import typealarmeRouter from './server/routes/api/Air_Typealarme.js';
import usineRouter from './server/routes/api/Usine.js';
import pythonRouter from './server/routes/api/pythonRoutesInes.js';
//import entretienRouter from './server/routes/api/Air_Entretien.js';
//.import equipementRouter from './server/routes/api/Air_Equipement.js';
dotenv.config();

dotenv.config();

const app = express();

const { PORT = 5000 } = process.env;

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
app.use('/api', machineRoutes);
app.use('/api', armoireRoutes);
app.use('/api',factureRoutes);
app.use('/api',pythonRouter);
app.use('/api/airalarmes', alarmeRouter);
app.use('/api/airTypeAlarme', typealarmeRouter);
app.use('/api/usine', usineRouter);
//app.use('/api/entretiens',entretienRouter);
//app.use('/api/equipements', equipementRouter);



app.get('/api', (req, res) => {
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
