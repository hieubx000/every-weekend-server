import { Request, Response } from 'express';
import slugify from 'slugify';
import TourModel from '../../model/tour.schema';
import { responseSuccess } from '../../utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const {
    createdBy,
    search,
    fromDate,
    toDate,
    minNumOfDay = 0,
    maxNumOfDay = Number.MAX_VALUE,
    minPrice = 0,
    maxPrice = Number.MAX_VALUE,
    fromDestination,
    toDestination,
    sortField,
    sortDirection,
  } = req.query;

  const skip = limit * (page - 1);
  const filter: any = {};
  if (createdBy) {
    filter.createdBy = createdBy;
  }
  if (search) {
    filter.title = { $regex: new RegExp(search as string, 'i') };
  }
  if (fromDate) {
    filter.fromDate = fromDate;
  }
  if (toDate) {
    filter.toDate = { $lte: toDate };
  }
  if (minNumOfDay || maxNumOfDay) {
    filter.numOfDays = { $gte: minNumOfDay, $lte: maxNumOfDay };
  }
  if (maxPrice || minPrice) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }
  if (fromDestination) {
    filter.fromDestination = fromDestination;
  }
  if (toDestination) {
    filter.toDestination = toDestination;
  }

  const sortDirectionParams = sortDirection ? Number(sortDirection) : -1;
  const sortParams = sortField
    ? {
        [sortField]: sortDirectionParams,
      }
    : {};

  const [tours, totaltour] = await Promise.all([
    TourModel.find(filter)
      .populate('createdBy')
      .populate('fromDestination')
      .populate('toDestination')
      .sort(sortParams)
      .skip(skip)
      .limit(limit),
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
  newtour.createdBy = req.user._id;
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
