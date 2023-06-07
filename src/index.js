require('express-async-errors');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const UploadRouter = require('./modules/upload/upload.router');
const UserRouter = require('./modules/user/user.router');
const AuthRouter = require('./modules/auth/auth.router');
const database = require('./common/database');

dotenv.config();
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');

async function main() {
  const app = new express();
  database();

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.get('/', (req, res) => {
    return res.json('ok');
  });

  app.use('/upload', UploadRouter);
  app.use('/auth', AuthRouter);
  app.use('/user', UserRouter);

  // catch 404 err
  app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).send({
      data: null,
      message: err.message || 'Something went wrong',
    });
  });

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(`http://127.0.0.1:${PORT}`);
  });
}

main();
