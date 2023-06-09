import { Router } from 'express';

import {
  create,
  findAll,
  findById,
  findBySlug,
  remove,
  update,
} from './blog.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const BlogRouter = Router();

BlogRouter.get('/', findAll);
BlogRouter.get('/:id', findById);
BlogRouter.get('/slug/:slug', findBySlug);
BlogRouter.post('/', AuthMiddleware, create);
BlogRouter.patch('/:id', update);
BlogRouter.delete('/:id', remove);

export default BlogRouter;
