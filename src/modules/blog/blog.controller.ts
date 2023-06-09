import { Request, Response } from 'express';
import slugify from 'slugify';
import BlogModel from '../../model/blog.schema';
import { responseSuccess } from '../../utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const { search, category, status, createdBy } = req.query;

  const skip = limit * (page - 1);
  const filter: any = {};
  if (search) {
    filter.title = { $regex: new RegExp(search as string, 'i') };
  }
  if (category) {
    filter.category = category;
  }
  if (status) {
    filter.status = status;
  }
  if (createdBy) {
    filter.createdBy = createdBy;
  }

  const [blogs, totalBlog] = await Promise.all([
    BlogModel.find(filter).populate('createdBy').skip(skip).limit(limit),
    BlogModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, blogs, totalBlog);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await BlogModel.findById(id);
  return responseSuccess(res, blog);
};
export const findBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const blog = await BlogModel.findOne({ slug });
  return responseSuccess(res, blog);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newBlog = new BlogModel(body);
  newBlog.slug = slugify(newBlog.title);
  newBlog.createdBy = req.user._id;
  const blog = await BlogModel.create(newBlog);
  return responseSuccess(res, blog);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  if (body.title) {
    body.slug = slugify(body.title);
  }
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
