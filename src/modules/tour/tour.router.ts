import { Router } from 'express';

import {
  create,
  findAll,
  findById,
  findBySlug,
  remove,
  update,
} from './tour.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const TourRouter = Router();

TourRouter.get('/', findAll);
TourRouter.get('/:id', findById);
TourRouter.get('/slug/:slug', findBySlug);
TourRouter.post('/', AuthMiddleware, create);
TourRouter.patch('/:id', update);
TourRouter.delete('/:id', remove);

export default TourRouter;
