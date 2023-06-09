require('express-async-errors');
import cors from 'cors';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { database } from './common/database';
import HttpError from './common/http.error';
import AuthRouter from './modules/auth/auth.router';
import BlogRouter from './modules/blog/blog.router';
import DestinationRouter from './modules/destination/destination.router';
import UploadRouter from './modules/upload/upload.router';
import UserRouter from './modules/user/user.router';
import TourRouter from './modules/tour/tour.router';
import HotelRouter from './modules/hotel/hotel.router';
import BookingTourRouter from './modules/booking/booking-tour.router';
import BookingHotelRouter from './modules/booking/booking-hotel.router';
import FeedbackRouter from './modules/feedback/feedback.router';
import RateTourRouter from './modules/rate-tour/rate-tour.router';
import RateHotelRouter from './modules/rate-hotel/rate-hotel.router';
import CommentRouter from './modules/comment/comment.router';

config();
const PORT = process.env.PORT || 5000;

async function main() {
  const app = express();
  database();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
      methods: 'GET,PUT,POST,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
    }),
  );

  app.get('/', (req: Request, res: Response) => {
    return res.json('ok');
  });

  app.use('/upload', UploadRouter);
  app.use('/auth', AuthRouter);
  app.use('/user', UserRouter);
  app.use('/destination', DestinationRouter);
  app.use('/blog', BlogRouter);
  app.use('/tour', TourRouter);
  app.use('/hotel', HotelRouter);
  app.use('/booking-tour', BookingTourRouter);
  app.use('/booking-hotel', BookingHotelRouter);
  app.use('/feedback', FeedbackRouter);
  app.use('/rate-tour', RateTourRouter);
  app.use('/rate-hotel', RateHotelRouter);
  app.use('/comment', CommentRouter);

  // catch 404 err
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new HttpError('Not Found!');
    err.status = 404;
    next(err);
  });

  app.use(
    (
      err: { status: number; message: any },
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      const status = err.status || 500;
      return res.status(status).send({
        data: null,
        message: err.message || 'Something went wrong',
      });
    },
  );

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(`http://127.0.0.1:${PORT}`);
  });
}

main();
