import UserModel from '../../model/user.schema';
import bcrypt from 'bcryptjs';
import { responseSuccess } from '../../utils/response.hepler';
import { Request, Response } from 'express';

// mongoose.model('users')
export const findAll = async (req: Request, res: Response) => {
  const page = parseInt(`${req.query.page}`) || 1;
  const limit = parseInt(`${req.query.limit}`) || 20;
  const skip = limit * (page - 1);
  const search = req.query.search;

  const filter: any = {};
  if (search) {
    filter.name = { $regex: new RegExp(search as string, 'i') };
  }

  const [users, totalUser] = await Promise.all([
    UserModel.find(filter).skip(skip).limit(limit),
    UserModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, users, totalUser);
};

export const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  return responseSuccess(res, user);
};

export const create = async (req: Request, res: Response) => {
  const body = req.body;
  const newUser = {
    userName: body?.userName,
    email: body?.email,
    password: await bcrypt.hash(body?.password, 10),
    name: body?.name,
    avatar: body?.avatar,
    role: body?.role,
  };
  const user = await UserModel.create(newUser);
  console.log('aaaaaaaaa');

  return responseSuccess(res, user);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const [_, user] = await Promise.all([
    await UserModel.findByIdAndUpdate(id, body),
    await UserModel.findById(id),
  ]);
  const data = {
    id: user._id,
    userName: user.userName,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    birthday: user.birthday,
    phoneNumber: user.phoneNumber,
    address: user.address,
    role: user.role,
  };
  
  return responseSuccess(res, data);
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);

  const data = {
    id: user._id,
    userName: user.userName,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    birthday: user.birthday,
    phoneNumber: user.phoneNumber,
    address: user.address,
    role: user.role,
  };
  return responseSuccess(res, data);
};
