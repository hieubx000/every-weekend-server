import { Request, Response } from 'express';
import BlogModel from '../../model/blog.schema';
import CommentModel from '../../model/comment.schema';
import { responseSuccess } from '../../utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const skip = limit * (page - 1);
  const { search, blog, createdBy } = req.query;

  const filter: any = {};
  if (search) {
    filter.context = { $regex: new RegExp(search as string, 'i') };
  }
  if (blog) {
    filter.blog = blog;
  }
  if (createdBy) {
    filter.createdBy = createdBy;
  }

  const [comment, totalcomment] = await Promise.all([
    CommentModel.find(filter)
      .skip(skip)
      .populate('createdBy')
      .populate('blog')
      .limit(limit),
    CommentModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, comment, totalcomment);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await CommentModel.findById(id);
  return responseSuccess(res, comment);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newcomment = new CommentModel(body);
  newcomment.createdBy = req.user._id;
  const comment = await CommentModel.create(newcomment);
  const comments = await CommentModel.find({ blog: body.blog });
  const sum = comments.reduce((pre, next) => pre + next.rate, 0);
  const avg = sum / comments.length || 0;
  await BlogModel.findByIdAndUpdate(body.blog, { rate: avg });
  return responseSuccess(res, comment);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, comment] = await Promise.all([
    await CommentModel.findByIdAndUpdate(id, body),
    await CommentModel.findById(id),
  ]);
  const comments = await CommentModel.find({ blog: comment.blog });
  const sum = comments.reduce((pre, next) => pre + next.rate, 0);
  const avg = sum / comments.length || 0;
  await BlogModel.findByIdAndUpdate(body.blog, { rate: avg });

  return responseSuccess(res, comment);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await CommentModel.findByIdAndDelete(id);
  return responseSuccess(res, comment);
};
