import { Router } from 'express';

import { create, findAll, findById, remove, update } from './blog.controller';

const BlogRouter = Router();

BlogRouter.get('/', findAll);
BlogRouter.get('/:id', findById);
BlogRouter.post('/', create);
BlogRouter.patch('/:id', update);
BlogRouter.delete('/:id', remove);

export default BlogRouter;
