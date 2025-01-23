import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes'
import adminRoutes from './routes/adminRoutes'
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes)

export default app;
