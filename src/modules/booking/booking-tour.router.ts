import { Router } from 'express';

import {
  create,
  findAll,
  findById,
  remove,
  update,
} from './booking-tour.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const BookingTourRouter = Router();

BookingTourRouter.get('/', findAll);
BookingTourRouter.get('/:id', findById);
BookingTourRouter.post('/', AuthMiddleware, create);
BookingTourRouter.patch('/:id', update);
BookingTourRouter.delete('/:id', remove);

export default BookingTourRouter;
