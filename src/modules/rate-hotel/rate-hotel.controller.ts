import { Request, Response } from 'express';
import HotelModel from '../../model/hotel.schema';
import RateHotelModel from '../../model/rate-hotel.schema';
import { responseSuccess } from '../../utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const skip = limit * (page - 1);
  const { search, hotel, createdBy } = req.query;

  const filter: any = {};
  if (search) {
    filter.context = { $regex: new RegExp(search as string, 'i') };
  }
  if (hotel) {
    filter.hotel = hotel;
  }
  if (createdBy) {
    filter.createdBy = createdBy;
  }

  const [rateHotel, totalRateHotel] = await Promise.all([
    RateHotelModel.find(filter)
      .skip(skip)
      .populate('createdBy')
      .populate('hotel')
      .limit(limit),
    RateHotelModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, rateHotel, totalRateHotel);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rateHotel = await RateHotelModel.findById(id);
  return responseSuccess(res, rateHotel);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newRateHotel = new RateHotelModel(body);
  newRateHotel.createdBy = req.user._id;
  const rateHotel = await RateHotelModel.create(newRateHotel);
  const rateHotels = await RateHotelModel.find({ hotel: body.hotel });
  const sum = rateHotels.reduce((pre, next) => pre + next.rate, 0);
  const avg = sum / rateHotels.length || 0;
  await HotelModel.findByIdAndUpdate(body.hotel, { rate: avg });
  return responseSuccess(res, rateHotel);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, rateHotel] = await Promise.all([
    await RateHotelModel.findByIdAndUpdate(id, body),
    await RateHotelModel.findById(id),
  ]);
  const rateHotels = await RateHotelModel.find({ hotel: rateHotel.hotel });
  const sum = rateHotels.reduce((pre, next) => pre + next.rate, 0);
  const avg = sum / rateHotels.length || 0;
  await HotelModel.findByIdAndUpdate(body.hotel, { rate: avg });

  return responseSuccess(res, rateHotel);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const rateHotel = await RateHotelModel.findByIdAndDelete(id);
  return responseSuccess(res, rateHotel);
};
