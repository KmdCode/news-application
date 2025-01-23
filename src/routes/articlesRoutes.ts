import express from 'express';
import { Article } from '../models/Article';

const router = express.Router();

router.get('/articles', async (req, res) => {
  const articles = await Article.findAll();
  res.render('articles/list', { articles });
});


router.get('/create', (req, res) => {
  res.render('articles/create');
});

router.post('/create', async (req, res) => {
  const { title, image, content, tags } = req.body;
  await Article.create({
    title,
    image,
    content,
    tags: tags.split(',').map((tag: string) => tag.trim()), 
  });
  res.redirect('/articles');
});

export default router;
