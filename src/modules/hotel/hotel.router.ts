import { Router } from 'express';

import {
  create,
  findAll,
  findById,
  findBySlug,
  remove,
  update,
} from './hotel.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const HotelRouter = Router();

HotelRouter.get('/', findAll);
HotelRouter.get('/:id', findById);
HotelRouter.get('/slug/:slug', findBySlug);
HotelRouter.post('/', AuthMiddleware, create);
HotelRouter.patch('/:id', update);
HotelRouter.delete('/:id', remove);

export default HotelRouter;
