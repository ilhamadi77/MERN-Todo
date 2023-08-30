import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';
import router from './routes';

const app = express();
const PORT = 8000;

const connectDB =
  'mongodb+srv://ilhamadi78:1el0OgGvfxIQk4a2@cluster0.44vroqv.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());

console.info('connectDB', connectDB);

app.use(router);

mongoose
  .connect(connectDB)
  .then(() => {
    app.listen(PORT, () => {
      console.info(`⚡⚡ server running in local port ${PORT} ⚡⚡ `);
    });
  })
  .catch((error) => {
    console.info('Error lagi', error);
  });
