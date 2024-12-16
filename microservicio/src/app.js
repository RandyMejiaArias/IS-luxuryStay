import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from './config.js';

import { sequelize } from './utils/database.js';

import roomRouter from './routes/room.routes.js';

const app = express();

(async () => {
  await sequelize.sync();
  console.log('Database connected');
} 
)();

app.set('port', config.PORT);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(json());
app.use(express.urlencoded({ extended: false }));

app.use('/rooms', roomRouter);

export { app };