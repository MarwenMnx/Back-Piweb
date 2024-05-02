/*import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/api/user.js';
import authRouter from './routes/api/auth.js';
import predictionRouter from './routes/api/prediction.js';

import machineRoutes from './routes/api/machineRoutes.js';
import armoireRoutes from './routes/api/armoireRoutes.js'; 
import factureRoutes from './routes/api/factureRoutes.js';
dote
import airConsomglobalRoutes from './routes/api/airConsomglobalRoutes.js'; // Adjust the path as per your directory structure
nv.config();

const app = express();
const { PORT = 8000, dbpassword } = process.env;



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

const CONNECTION_URL = `mongodb+srv://nejimarwan21:${dbpassword}@piwebcluster.yq3u1v6.mongodb.net/`;
mongoose
  .connect(CONNECTION_URL, {})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

*/