import app from './app';
import sequelize from './database/database';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({path: './config/config.env'})

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the PostgreSQL database.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
