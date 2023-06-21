import { Router } from 'express';
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from './rate-tour.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const RateTourRouter = Router();

RateTourRouter.get('/', findAll);
RateTourRouter.get('/:id', findById);
RateTourRouter.post('/', AuthMiddleware, create);
RateTourRouter.patch('/:id', update);
RateTourRouter.delete('/:id', remove);

export default RateTourRouter;
