import { Response } from 'express';

export const responseSuccess = (res: Response, data: any, total?: number) => {
  return res.status(200).json({ success: 1, data, total });
};
