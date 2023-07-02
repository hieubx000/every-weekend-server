import { Request, Response } from 'express';
import BookingHotelModel from '../../model/booking-hotel.schema';
import { responseSuccess } from '../../utils/response.hepler';
import HotelModel from '../../model/hotel.schema';
import HttpError from '../../common/http.error';
import { Types } from 'mongoose';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const { createdBy, hotel, status, authorHotel } = req.query;

  const skip = limit * (page - 1);
  const filter: any = {};

  if (createdBy) {
    filter.createdBy = createdBy;
  }
  if (hotel) {
    filter.hotel = hotel;
  }
  if (status) {
    filter.status = status;
  }
  console.log(authorHotel);
  const filter2: any = {};
  if (authorHotel) {
    filter2['hotel.createdBy'] = {
      $eq: new Types.ObjectId(`${authorHotel}`),
    };
  }

  const [bookinghotel, totalBookinghotel] = await Promise.all([
    await BookingHotelModel.aggregate([
      { $match: { ...filter } },
      {
        $lookup: {
          from: 'hotels',
          localField: 'hotel',
          foreignField: '_id',
          as: 'hotel',
        },
      },
      { $unwind: '$hotel' },
      { $skip: skip },
      { $limit: limit },
      {
        $match: {
          ...filter2,
        },
      },
    ]),
    await BookingHotelModel.aggregate([
      { $match: { ...filter } },
      {
        $lookup: {
          from: 'hotels',
          localField: 'hotel',
          foreignField: '_id',
          as: 'hotel',
        },
      },
      { $unwind: '$hotel' },
      {
        $match: {
          ...filter2,
        },
      },
      { $count: 'count' },
    ]),
  ]);
  return responseSuccess(res, bookinghotel, totalBookinghotel[0].count);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hotel = await BookingHotelModel.findById(id);
  return responseSuccess(res, hotel);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newBookinghotel = new BookingHotelModel(body);
  newBookinghotel.createdBy = req?.user?._id || '';
  const hotel = await HotelModel.findById(req.body?.hotel);
  if (hotel) {
    // newBookinghotel.price = hotel.price;
    newBookinghotel.totalPrice =
      parseFloat(`${hotel.price * (newBookinghotel?.totalCustomer || 1)}`) || 0;
  } else {
    throw new HttpError('Not Found hotel', 400);
  }
  const bookinghotel = await BookingHotelModel.create(newBookinghotel);
  return responseSuccess(res, bookinghotel);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, bookinghotel] = await Promise.all([
    await BookingHotelModel.findByIdAndUpdate(id, body),
    await BookingHotelModel.findById(id),
  ]);
  const hotel = await HotelModel.findById(bookinghotel.hotel);
  // trigger update
  bookinghotel.price = hotel.price;
  bookinghotel.totalPrice =
    parseFloat(`${hotel.price * (bookinghotel?.totalCustomer || 1)}`) || 0;
  await bookinghotel.save();
  return responseSuccess(res, bookinghotel);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookinghotel = await BookingHotelModel.findByIdAndDelete(id);
  return responseSuccess(res, bookinghotel);
};
