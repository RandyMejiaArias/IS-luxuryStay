import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT || 4000,
  DB: process.env.MYSQL_DATABASE,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
}
