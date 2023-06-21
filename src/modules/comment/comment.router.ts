import { Router } from 'express';
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from './comment.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const CommentRouter = Router();

CommentRouter.get('/', findAll);
CommentRouter.get('/:id', findById);
CommentRouter.post('/', AuthMiddleware, create);
CommentRouter.patch('/:id', update);
CommentRouter.delete('/:id', remove);

export default CommentRouter;
