import Sequelize from 'sequelize';
import config from '../config.js';

const sequelize = new Sequelize(
  config.database,
  config.dbUser,
  config.dbPassword,
  {
    dialect: config.dialect,
    host: config.dbHost,
    logging: false,
  }
);

export default sequelize;
