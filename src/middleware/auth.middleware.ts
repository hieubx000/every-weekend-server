import { NextFunction, Request, Response } from 'express';

import { verifyToken } from '../utils/jwt.helper';

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.split(' ')[1];
    if (token) {
      const decoded: any = await verifyToken(token);
      req.user = decoded?.data;
      next();
    } else {
      throw new Error('UNAUTHORIZED');
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: error.message,
    });
  }
};
export const AdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization || '';
    const token = authorization.split(' ')[1];
    if (token) {
      const decoded: any = await verifyToken(token);
      console.log(decoded.data);
      req.user = decoded.data;
      if (decoded.data?.role == 'admin') {
        next();
      } else {
        throw new Error('UNAUTHORIZED');
      }
      next();
    } else {
      throw new Error('UNAUTHORIZED');
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: error.message,
    });
  }
};
