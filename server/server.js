import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/api/user.js';
import authRouter from './routes/api/auth.js';
import predictionRouter from './routes/api/prediction.js';

dotenv.config();

const app = express();

const { PORT = 8000, dbpassword } = process.env;

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

const CONNECTION_URL = `mongodb+srv://nejimarwan21:${dbpassword}@piwebcluster.yq3u1v6.mongodb.net/`;
mongoose
  .connect(CONNECTION_URL, {})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
