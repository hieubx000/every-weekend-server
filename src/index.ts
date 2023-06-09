require('express-async-errors');
import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import UploadRouter from './modules/upload/upload.router';
import UserRouter from './modules/user/user.router';
import AuthRouter from './modules/auth/auth.router';
import { database } from './common/database';

config();
const PORT = process.env.PORT || 5000;
import morgan from 'morgan';
import HttpError from './common/http.error';
import DestinationRouter from './modules/destination/destination.router';

async function main() {
  const app = express();
  database();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.get('/', (req: Request, res: Response) => {
    return res.json('ok');
  });

  app.use('/upload', UploadRouter);
  app.use('/auth', AuthRouter);
  app.use('/user', UserRouter);
  app.use('/destination', DestinationRouter);

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
