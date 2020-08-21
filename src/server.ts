// Imports
import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import router from './controllers';

// Config
dotenv.config();
const local = {
  port: 8080,
  mongoUri: 'mongodb://localhost:27017/mern',
};
const deployment = {
  mongoUri: process.env.MONGODB_URI,
};
const app: Express = express();
const PORT = local.port;
const MONGODB_URI: string = deployment.mongoUri || local.mongoUri;

// Connect to MongoDB via Mongoose
mongoose.connection.on('error', (error) =>
  console.log(`${error.message} is Mongo not running?`)
);
mongoose.connection.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Mongoose');
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Routers
app.use('/api', router);
app.use('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
