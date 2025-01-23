import { Request, Response } from 'express';
import { Article } from '../models/Article';

// Get all articles for the homepage
export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await Article.findAll(); // Fetch articles from the database
    res.render('home', { articles }); // Pass the articles to the EJS template
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching articles.');
  }
};

// Get a single article
export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const article = await Article.findByPk(id);
    if (!article) {
      res.status(404).send('Article not found');
      return;
    }
    res.render('articles/show', { article });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the article.');
  }
};
