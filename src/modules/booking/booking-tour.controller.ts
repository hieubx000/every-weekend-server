import { Request, Response } from 'express';
import BookingTourModel from '../../model/booking-tour.schema';
import { responseSuccess } from '../../utils/response.hepler';
import TourModel from '../../model/tour.schema';
import HttpError from '../../common/http.error';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const { createdBy, tour, status, cName, cEmail, cPhone } = req.query;

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
  if (tour) {
    filter.tour = tour;
  }
  if (status) {
    filter.status = status;
  }

  const [bookingTour, totalBookingTour] = await Promise.all([
    BookingTourModel.find(filter)
      .populate('createdBy')
      .populate('tour')
      .skip(skip)
      .limit(limit),
    BookingTourModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, bookingTour, totalBookingTour);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = await BookingTourModel.findById(id);
  return responseSuccess(res, tour);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newBookingTour = new BookingTourModel(body);
  newBookingTour.createdBy = req?.user?._id || '';
  const tour = await TourModel.findById(req.body?.tour);
  if (tour) {
    newBookingTour.price = tour.price;
    newBookingTour.totalPrice =
      parseFloat(`${tour.price * (newBookingTour?.totalCustomer || 1)}`) || 0;
  } else {
    throw new HttpError('Not Found tour', 400);
  }
  const bookingTour = await BookingTourModel.create(newBookingTour);
  return responseSuccess(res, bookingTour);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, bookingTour] = await Promise.all([
    await BookingTourModel.findByIdAndUpdate(id, body),
    await BookingTourModel.findById(id),
  ]);
  const tour = await TourModel.findById(bookingTour.tour);
  // trigger update
  bookingTour.price = tour.price;
  bookingTour.totalPrice =
    parseFloat(`${tour.price * (bookingTour?.totalCustomer || 1)}`) || 0;
  await bookingTour.save();
  return responseSuccess(res, bookingTour);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookingTour = await BookingTourModel.findByIdAndDelete(id);
  return responseSuccess(res, bookingTour);
};
