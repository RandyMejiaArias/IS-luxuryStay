import Sequelize from 'sequelize';
import config  from '../config.js';

export const sequelize = new Sequelize(
  config.DB,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST, // nombre del contenedor de docker
    port: config.DB_PORT,
    dialect: 'mysql',
    pool:{
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    },
    logging: false
  }
);