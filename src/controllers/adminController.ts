import { Request, Response, RequestHandler } from 'express';
import { Article } from '../models/Article'; 

export const createArticle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { title, image, content, tags } = req.body;

  try {
    const article = await Article.create({ title, image, content, tags });
    res.status(201).json({ message: 'Article created successfully', article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the article' });
  }
};


export const getAllArticles: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the articles' });
  }
};


export const getArticleById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the article' });
  }
};


export const updateArticle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, image, content, tags } = req.body;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    await article.update({ title, image, content, tags });
    res.status(200).json({ message: 'Article updated successfully', article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the article' });
  }
};


export const deleteArticle: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }

    await article.destroy();
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the article' });
  }
};
