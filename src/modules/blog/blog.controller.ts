import { Request, Response } from 'express';
import BlogModel from 'src/model/blog.schema';
import { responseSuccess } from 'src/utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const search = req.query;
  const skip = limit * (page - 1);
  const filter: any = {};
  if (search) {
    filter.$text = { $search: search };
  }
  const [users, totalUser] = await Promise.all([
    BlogModel.find(filter).skip(skip).limit(limit),
    BlogModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, users, totalUser);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await BlogModel.findById(id);
  return responseSuccess(res, user);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newBlog = new BlogModel(body);
  const user = await BlogModel.create(newBlog);

  return responseSuccess(res, user);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, user] = await Promise.all([
    await BlogModel.findByIdAndUpdate(id, body),
    await BlogModel.findById(id),
  ]);
  return responseSuccess(res, user);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await BlogModel.findByIdAndDelete(id);
  return responseSuccess(res, user);
};
