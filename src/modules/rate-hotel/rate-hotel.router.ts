import { Router } from 'express';
import {
  findAll,
  findById,
  create,
  update,
  remove,
} from './rate-hotel.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const RateHotelRouter = Router();

RateHotelRouter.get('/', findAll);
RateHotelRouter.get('/:id', findById);
RateHotelRouter.post('/', AuthMiddleware, create);
RateHotelRouter.patch('/:id', update);
RateHotelRouter.delete('/:id', remove);

export default RateHotelRouter;
