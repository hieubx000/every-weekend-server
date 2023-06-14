import { Router } from 'express';

import {
  create,
  findAll,
  findById,
  remove,
  update,
} from './booking-hotel.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const BookingHotelRouter = Router();

BookingHotelRouter.get('/', findAll);
BookingHotelRouter.get('/:id', findById);
BookingHotelRouter.post('/', AuthMiddleware, create);
BookingHotelRouter.patch('/:id', update);
BookingHotelRouter.delete('/:id', remove);

export default BookingHotelRouter;
