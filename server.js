import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.js'; 
import authRouter from './server/routes/api/authRoutes.js'; // Import authentication routes
import machineRoutes from './server/routes/api/machineRoutes.js';
import armoireRoutes from './server/routes/api/armoireRoutes.js'; 
import factureRoutes from './server/routes/api/factureRoutes.js';
import alarmeRouter from './server/routes/api/AirAlarme.js';
//import typealarmeRouter from './server/routes/api/Air_Typealarme.js';
//import usineRouter from './server/routes/api/Usine.js';
import entretienRouter from './server/routes/api/airEntretienRoutes.js';
//.import equipementRouter from './server/routes/api/Air_Equipement.js';
import airConsomGlobalRoutes from './server/routes/api/airConsomglobalRoutes.js';
import airLocalCompresseurRoutes from './server/routes/api/airLocalCompresseurRoutes.js'; // Import the air local compresseur routes
//import  equipementRouter from './server/routes/api/airEquipmentRoutes.js';
import userRouter from './server/routes/api/user.js';
import superviseurRouter from './server/routes/api/superviseurRoutes.js'


import predictionRouter from './server/routes/api/prediction.js'

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
app.use('/api', machineRoutes);//working
app.use('/api', armoireRoutes);//working
app.use('/api',factureRoutes);//working
app.use('/api', airConsomGlobalRoutes);//working
app.use('/api', airLocalCompresseurRoutes);//working
app.use('/api/airalarmes', alarmeRouter);//working
//app.use('/api/airTypeAlarme', typealarmeRouter);//working 
//app.use('/api/usine', usineRouter);//working
app.use('/api/users', userRouter);//working
//app.use('/api/auth', authRouter);//working
app.use('/api/entretiens', entretienRouter);//working
app.use('/api/superviseur', superviseurRouter);//working

//


app.use('/api/auth', authRouter);//working
app.use('/api/predict', predictionRouter);//working

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