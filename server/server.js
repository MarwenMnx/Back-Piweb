import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import alarmeRouter from './routes/api/AirAlarme.js';

import entretienRouter from './routes/api/airEntretienRoutes.js';
//import equipementRouter from './routes/api/airEquipmentRoutes.js';
import userRouter from './routes/api/user.js';
import { authRouter } from './routes/api/auth.js';
//import airspvsRouter from './routes/api/airsuperviseur.js';

dotenv.config();

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

app.use('/api/airalarmes', alarmeRouter);

app.use('/api/entretiens', entretienRouter);
//app.use('/api/equipements', equipementRouter);
//app.use('/api/airspvs', airspvsRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});
const CONNECTION_URL = `mongodb+srv://ineslachkhem:piwebines@cluster0.kmdgs4p.mongodb.net/`;
mongoose.connect(CONNECTION_URL, {  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
