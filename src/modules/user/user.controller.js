const { default: mongoose } = require('mongoose');
const UserModel = require('../../model/user.schema');
const bcrypt = require('bcryptjs');
const { responseSuccess } = require('../../utils/response.hepler');

// mongoose.model('users')
const findAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = limit * (page - 1);
  const search = req.query.search;

  const filter = {};
  if (search) {
    filter.$text = { $search: search };
  }

  const [users, totalUser] = await Promise.all([
    UserModel.find(filter).skip(skip).limit(limit),
    UserModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, users, totalUser);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  return responseSuccess(res, user);
};

const create = async (req, res) => {
  const body = req.body;
  const newUser = {
    email: body?.email,
    password: await bcrypt.hash(body?.password, 10),
    name: body?.name,
    avatar: body?.avatar,
    role: body?.role,
  };
  const user = await UserModel.create(newUser);

  return responseSuccess(res, user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = await UserModel.findByIdAndUpdate(id, body);
  return responseSuccess(res, user);
};

const remove = async (req, res) => {
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

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
