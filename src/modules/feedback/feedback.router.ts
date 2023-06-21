import { Router } from 'express';
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from './feedback.controller';

const FeedbackRouter = Router();

FeedbackRouter.get('/', findAll);
FeedbackRouter.get('/:id', findById);
FeedbackRouter.post('/', create);
FeedbackRouter.patch('/:id', update);
FeedbackRouter.delete('/:id', remove);

export default FeedbackRouter;
