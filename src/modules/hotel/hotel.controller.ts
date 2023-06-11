import { Request, Response } from 'express';
import slugify from 'slugify';
import HotelModel from '../../model/hotel.schema';
import { responseSuccess } from '../../utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const { search, toDestination, createdBy } = req.query;

  const skip = limit * (page - 1);
  const filter: any = {};
  if (createdBy) {
    filter.createdBy = createdBy;
  }
  if (search) {
    filter.title = { $regex: new RegExp(search as string, 'i') };
  }
  if (toDestination) {
    filter.toDestination = toDestination;
  }
  const [hotels, totalhotel] = await Promise.all([
    HotelModel.find(filter)
      .populate('createdBy')
      .populate('toDestination')
      .skip(skip)
      .limit(limit),
    HotelModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, hotels, totalhotel);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hotel = await HotelModel.findById(id);
  return responseSuccess(res, hotel);
};
export const findBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const hotel = await HotelModel.findOne({ slug });
  return responseSuccess(res, hotel);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newhotel = new HotelModel(body);
  newhotel.slug = slugify(newhotel.title);
  newhotel.createdBy = req?.user?._id || '';
  const hotel = await HotelModel.create(newhotel);
  return responseSuccess(res, hotel);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  if (body.title) {
    body.slug = slugify(body.title);
  }
  const [_, hotel] = await Promise.all([
    await HotelModel.findByIdAndUpdate(id, body),
    await HotelModel.findById(id),
  ]);
  return responseSuccess(res, hotel);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hotel = await HotelModel.findByIdAndDelete(id);
  return responseSuccess(res, hotel);
};
