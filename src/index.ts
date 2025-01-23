import app from './app';
import sequelize from './database/database';
import path from 'path';
import dotenv from 'dotenv';
import User from './models/user';

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the PostgreSQL database.');
    // Sync all models
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
