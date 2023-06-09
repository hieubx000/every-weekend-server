import { Request, Response } from 'express';
import BlogModel from '../../model/blog.schema';
import { responseSuccess } from '../../utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const search = req.query.search;
  const skip = limit * (page - 1);
  const filter: any = {};
  if (search) {
    // filter.name = { $search: search };
  }
  const [blogs, totalBlog] = await Promise.all([
    BlogModel.find(filter).skip(skip).limit(limit),
    BlogModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, blogs, totalBlog);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await BlogModel.findById(id);
  return responseSuccess(res, blog);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newBlog = new BlogModel(body);
  const blog = await BlogModel.create(newBlog);

  return responseSuccess(res, blog);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, blog] = await Promise.all([
    await BlogModel.findByIdAndUpdate(id, body),
    await BlogModel.findById(id),
  ]);
  return responseSuccess(res, blog);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await BlogModel.findByIdAndDelete(id);
  return responseSuccess(res, blog);
};
