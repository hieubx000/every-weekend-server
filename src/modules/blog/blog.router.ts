import { Router } from 'express';

import {
  create,
  findAll,
  findById,
  findBySlug,
  remove,
  update,
} from './blog.controller';

const BlogRouter = Router();

BlogRouter.get('/', findAll);
BlogRouter.get('/:id', findById);
BlogRouter.get('/slug/:id', findBySlug);
BlogRouter.post('/', create);
BlogRouter.patch('/:id', update);
BlogRouter.delete('/:id', remove);

export default BlogRouter;
