import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes'
import adminRoutes from './routes/adminRoutes'
import articlesRoutes from './routes/articlesRoutes'
import userRoutes from './routes/userRoutes'
import morgan from 'morgan';
import path from 'path';

const app = express();
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
  });

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes)
app.use('/articles', articlesRoutes);
app.use('/', userRoutes)


export default app;
