import RateTourModel from '../../model/rate-tour.schema';
import TourModel from '../../model/tour.schema';
import { responseSuccess } from '../../utils/response.hepler';
import { Request, Response } from 'express';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const skip = limit * (page - 1);
  const { search, tour, createdBy } = req.query;

  const filter: any = {};
  if (search) {
    filter.context = { $regex: new RegExp(search as string, 'i') };
  }
  if (tour) {
    filter.tour = tour;
  }
  if (createdBy) {
    filter.createdBy = createdBy;
  }
  const [rateTour, totalRateTour] = await Promise.all([
    RateTourModel.find(filter)
      .skip(skip)
      .populate('createdBy')
      .populate('tour')
      .limit(limit),
    RateTourModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, rateTour, totalRateTour);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rateTour = await RateTourModel.findById(id);
  return responseSuccess(res, rateTour);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newRateTour = new RateTourModel(body);
  newRateTour.createdBy = req.user._id;
  const rateTour = await RateTourModel.create(newRateTour);
  const rateTours = await RateTourModel.find({ tour: body.tour });
  const sum = rateTours.reduce((pre, next) => pre + next.rate, 0);
  const avg = sum / rateTours.length || 0;
  await TourModel.findByIdAndUpdate(body.tour, { rate: avg });
  return responseSuccess(res, rateTour);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, rateTour] = await Promise.all([
    await RateTourModel.findByIdAndUpdate(id, body),
    await RateTourModel.findById(id),
  ]);
  const rateTours = await RateTourModel.find({ tour: rateTour.tour });
  const sum = rateTours.reduce((pre, next) => pre + next.rate, 0);
  const avg = sum / rateTours.length || 0;
  await TourModel.findByIdAndUpdate(body.tour, { rate: avg });

  return responseSuccess(res, rateTour);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rateTour = await RateTourModel.findByIdAndDelete(id);
  return responseSuccess(res, rateTour);
};
