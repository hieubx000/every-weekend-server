const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/jwt.helper');
const UserModel = require('../../model/user.schema');
const HttpError = require('../../common/http.error');
const { responseSuccess } = require('../../utils/response.hepler');

const login = async (req, res) => {
  // check if the user exists
  const user = await UserModel.findOne({ username: req.body.userName });
  if (user) {
    //check if password matches
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      // sign token and send it in response
      const token = await generateToken(user);
      const data = {
        id: user._id,
        user: user.name,
        name: user.email,
        avatar: user.avatar,
        birthday: user.birthday,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
      };

      return responseSuccess(res, { data, token });
    } else {
      throw new HttpError(`Login fail`, 400);
    }
  } else {
    throw new HttpError(`Login fail`, 400);
  }
};

const register = async (req, res) => {
  // hash the password
  const exists = await UserModel.findOne({ userName: req.body.userName });
  if (exists) {
    throw new HttpError(`userName is exits`, 400);
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await UserModel.create(req.body);
    // send new user as response
    const token = await generateToken(user);

    const data = {
      id: user._id,
      user: user.name,
      name: user.email,
      avatar: user.avatar,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
    };

    return responseSuccess(res, { data, token });
  }
};

module.exports = {
  login,
  register,
};
