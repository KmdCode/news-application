import express from 'express';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { getAllArticles, getArticleById } from '../controllers/userController';
import Article from '../models/Article';

const router = express.Router();

router.get('/', getAllArticles);

router.get('/articles/:id', getArticleById);

router.get('/search', async (req: Request, res: Response) => {
    const query = typeof req.query.query === 'string' ? req.query.query : '';

    try {
        const articles = await Article.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.iLike]: `%${query}%`,
                        },
                    },
                    {
                        tags: {
                            [Op.overlap]: query.split(' '),
                        },
                    },
                ],
            },
        });

        res.render('home', { articles });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while searching articles.');
    }
});


export default router;
