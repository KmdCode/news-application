import express from 'express';
import { Article } from '../models/Article';

const router = express.Router();

// List all articles
router.get('/', async (req, res) => {
  const articles = await Article.findAll();
  res.render('articles/list', { articles });
});

// Render create article form
router.get('/create', (req, res) => {
  res.render('articles/create');
});

// Handle create article
router.post('/create', async (req, res) => {
  const { title, image, content, tags } = req.body;
  await Article.create({
    title,
    image,
    content,
    tags: tags.split(',').map((tag: string) => tag.trim()), // Split and trim tags
  });
  res.redirect('/articles');
});

// Add more routes for edit and delete as needed...

export default router;
