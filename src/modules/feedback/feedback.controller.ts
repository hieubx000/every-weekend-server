import FeedBackModel from '../../model/feedback.schema';
import { responseSuccess } from '../../utils/response.hepler';
import { Request, Response } from 'express';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const skip = limit * (page - 1);
  const search = req.query.search;

  const filter: any = {};
  if (search) {
    filter.content = { $regex: new RegExp(search as string, 'i') };
  }

  const [feedbacks, totalFeedback] = await Promise.all([
    FeedBackModel.find(filter).skip(skip).limit(limit),
    FeedBackModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, feedbacks, totalFeedback);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const feedBack = await FeedBackModel.findById(id);
  return responseSuccess(res, feedBack);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const feedBack = await FeedBackModel.create(body);

  return responseSuccess(res, feedBack);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, feedBack] = await Promise.all([
    await FeedBackModel.findByIdAndUpdate(id, body),
    await FeedBackModel.findById(id),
  ]);

  return responseSuccess(res, feedBack);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const feedBack = await FeedBackModel.findByIdAndDelete(id);
  return responseSuccess(res, feedBack);
};
