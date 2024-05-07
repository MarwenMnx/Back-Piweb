import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/api/user.js';
import authRouter from './routes/api/auth.js';
import predictionRouter from './routes/api/prediction.js';
import http from 'http'; // Import the http module
import { Server } from 'socket.io'; // Import the Server class from socket.io
import { startSocketLogic } from '../socket.js'; // Import the socket logic function
import airConsomglobalRouter from './routes/api/consomglobal.js'
import airLocalCompresseurRouter from './routes/api/airLocalCompresseur.js'

dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server

const io = new Server(server, {
  cors: {
    origin: '*',
  },
}); // Create a new instance of Socket.io with CORS configuration

const { PORT = 8000, dbpassword } = process.env;



app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allow all CORS requests
app.use(express.static('./dist/'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/predict', predictionRouter);
app.use('/api/consomglobal', airConsomglobalRouter);
app.use('/api/airlocalcomp', airLocalCompresseurRouter);

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

const CONNECTION_URL = `mongodb+srv://nejimarwan21:${dbpassword}@piwebcluster.yq3u1v6.mongodb.net`;
mongoose
  .connect(CONNECTION_URL, {})
  .then(() => {
    startSocketLogic(io);

    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));
