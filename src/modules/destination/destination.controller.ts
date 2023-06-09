import { Request, Response } from 'express';
import DestinationModel from '../../model/destination.schema';
import { responseSuccess } from '../../utils/response.hepler';

export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const search = req.query.search;
  const skip = limit * (page - 1);
  const filter: any = {};
  if (search) {
    // filter.name = { $search: search };
  }
  const [destinations, totalDestination] = await Promise.all([
    DestinationModel.find(filter).skip(skip).limit(limit),
    DestinationModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, destinations, totalDestination);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const destination = await DestinationModel.findById(id);
  return responseSuccess(res, destination);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newDestination = new DestinationModel(body);
  const destination = await DestinationModel.create(newDestination);

  return responseSuccess(res, destination);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, destination] = await Promise.all([
    await DestinationModel.findByIdAndUpdate(id, body),
    await DestinationModel.findById(id),
  ]);
  return responseSuccess(res, destination);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const destination = await DestinationModel.findByIdAndDelete(id);
  return responseSuccess(res, destination);
};
