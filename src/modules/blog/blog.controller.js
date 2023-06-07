const { default: mongoose } = require('mongoose');
const BlogModel = require('../../model/blog.schema');
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
    BlogModel.find(filter).skip(skip).limit(limit),
    BlogModel.find(filter).countDocuments(),
  ]);
  return responseSuccess(res, users, totalUser);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await BlogModel.findById(id);
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
  const user = await BlogModel.create(newUser);

  return responseSuccess(res, user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = await BlogModel.findByIdAndUpdate(id, body);
  return responseSuccess(res, user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await BlogModel.findByIdAndDelete(id);
  return responseSuccess(res, user);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
