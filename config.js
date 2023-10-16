import dotenv from 'dotenv';
dotenv.config();

const config = {
  secretKey: process.env.SECRET_KEY,
  database: process.env.MYSQL_DATABASE,
  dbUser: process.env.MYSQL_USER,
  dbPassword: process.env.MYSQL_PASSWORD,
  dbHost: process.env.HOST,
  dialect: process.env.DIALECT,
  port: process.env.PORT,
};

export default config;
