import { Request, Response } from 'express';
import slugify from 'slugify';
import TourModel from '../../model/tour.schema';
import { responseSuccess } from '../../utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const {
    author,
    search,
    fromDate,
    numOfDays,
    minPrice = 0,
    maxPrice = Number.MAX_VALUE,
  } = req.query;

  const skip = limit * (page - 1);
  const filter: any = {};
  if (author) {
    filter.auth = author;
  }
  if (search) {
    filter.title = { $regex: new RegExp(search as string, 'i') };
  }
  if (fromDate) {
    filter.fromDate = { $gte: new Date(fromDate as string) };
  }
  if (fromDate) {
    filter.fromDate = { $lte: new Date(fromDate as string) };
  }
  if (numOfDays) {
    filter.numOfDays = numOfDays;
  }
  if (maxPrice || minPrice) {
    filter.salePrice = { $gte: minPrice, $lte: maxPrice };
  }
  const [tours, totaltour] = await Promise.all([
    TourModel.find(filter).populate('author').skip(skip).limit(limit),
    TourModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, tours, totaltour);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = await TourModel.findById(id);
  return responseSuccess(res, tour);
};
export const findBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const tour = await TourModel.findOne({ slug });
  return responseSuccess(res, tour);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newtour = new TourModel(body);
  newtour.author = req.user._id;
  newtour.slug = slugify(newtour.title);
  const tour = await TourModel.create(newtour);
  return responseSuccess(res, tour);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  if (body.title) {
    body.slug = slugify(body.title);
  }
  const [_, tour] = await Promise.all([
    await TourModel.findByIdAndUpdate(id, body),
    await TourModel.findById(id),
  ]);
  return responseSuccess(res, tour);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = await TourModel.findByIdAndDelete(id);
  return responseSuccess(res, tour);
};
