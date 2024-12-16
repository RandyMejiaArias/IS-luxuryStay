import express from 'express';

import { sequelize } from './utils/database.js';

const app = express();

// Sincroniza la base de datos
(async () => {
  await sequelize.sync({
    force: true
  });
  console.log('Database connected');
} 
)();

// app.use(express.json());

export { app };