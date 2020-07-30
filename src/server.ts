// Imports
import express, { Express } from 'express';
import mongoose from 'mongoose';
import router from './controllers';

// Config
const local = {
  port: 8080,
  mongoUri: 'mongodb://localhost:27017/mern',
  clientUrl: 'http://localhost:3000',
};
const deployment = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  clientUrl: 'http://localhost:3000',
};
const app: Express = express();
const PORT: string | number = deployment.port || local.port;
const MONGODB_URI: string = deployment.mongoUri || local.mongoUri;

// Connect to MongoDB via Mongoose
mongoose.connection.on('error', (error) =>
  console.log(`${error.message} is Mongo not running?`)
);
mongoose.connection.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to Mongoose');
});

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Routers
app.use('/api', router);

// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
