import { Request, Response } from 'express';
import BookingHotelModel from '../../model/booking-hotel.schema';
import { responseSuccess } from '../../utils/response.hepler';
import HotelModel from '../../model/hotel.schema';
import HttpError from '../../common/http.error';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const { createdBy, hotel, status, cName, cEmail, cPhone } = req.query;

  const skip = limit * (page - 1);
  const filter: any = {};
  if (cName) {
    filter.cName = { $regex: new RegExp(cName as string, 'i') };
  }
  if (cEmail) {
    filter.cName = { $regex: new RegExp(cName as string, 'i') };
  }
  if (cPhone) {
    filter.cPhone = { $regex: new RegExp(cPhone as string, 'i') };
  }
  if (createdBy) {
    filter.createdBy = createdBy;
  }
  if (hotel) {
    filter.hotel = hotel;
  }
  if (status) {
    filter.status = status;
  }

  const [bookingHotels, totalBookingHotel] = await Promise.all([
    BookingHotelModel.find(filter)
      .populate('createdBy')
      .populate('hotel')
      .skip(skip)
      .limit(limit),
    BookingHotelModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, bookingHotels, totalBookingHotel);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hotel = await BookingHotelModel.findById(id);
  return responseSuccess(res, hotel);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newBookingHotel = new BookingHotelModel(body);
  newBookingHotel.createdBy = req?.user?._id || '';
  const hotel = await HotelModel.findById(req.body?.hotel);
  if (hotel) {
    newBookingHotel.price = hotel.price;
    newBookingHotel.totalPrice =
      parseFloat(`${hotel.price * (newBookingHotel?.totalCustomer || 1)}`) || 0;
  } else {
    throw new HttpError('Not Found Hotel', 400);
  }
  const bookingHotel = await BookingHotelModel.create(newBookingHotel);
  return responseSuccess(res, bookingHotel);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, bookingHotel] = await Promise.all([
    await BookingHotelModel.findByIdAndUpdate(id, body),
    await BookingHotelModel.findById(id),
  ]);
  const hotel = await HotelModel.findById(bookingHotel.hotel);
  // trigger update
  bookingHotel.price = hotel.price;
  bookingHotel.totalPrice =
    parseFloat(`${hotel.price * (bookingHotel?.totalCustomer || 1)}`) || 0;
  await bookingHotel.save();
  return responseSuccess(res, bookingHotel);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookingHotel = await BookingHotelModel.findByIdAndDelete(id);
  return responseSuccess(res, bookingHotel);
};
