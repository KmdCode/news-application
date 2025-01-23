import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({path: './../config/config.env'})

const sequelize = new Sequelize(
    process.env.DB_NAME || 'news_database',
    process.env.DB_USER || 'karabo',
    String(process.env.DB_PASSWORD || '1234'),
    {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
    }
  );

export default sequelize;
