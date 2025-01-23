import { Router } from 'express';
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/adminController';

const router = Router();

router.post('/articles', createArticle);
router.get('/articles', getAllArticles);
router.get('/articles/:id', getArticleById);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

export default router;
