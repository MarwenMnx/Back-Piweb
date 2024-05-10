import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/api/user.js';
import authRouter from './routes/api/auth.js';
import predictionRouter from './routes/api/prediction.js';
import http from 'http';
import { Server } from 'socket.io';
import { initializeSocketLogic } from '../socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const { PORT = 8000 } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./dist/'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/predict', predictionRouter);

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

const { username, password, uri, dbName } = {
  username: 'Sirinezoghlami',
  password: 'q6su8XtRIoq9bAXU',
  uri: 'cluster0.vsngh37.mongodb.net',
  dbName: 'EnergyGuard',
};

const CONNECTION_URL = `mongodb+srv://${username}:${password}@${uri}/${dbName}`;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    initializeSocketLogic(io);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
