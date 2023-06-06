const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt.helper");
const UserModel = require("../../model/user.schema");
const HttpError = require("../../common/http.error");
const { responseSuccess } = require("../../utils/response.hepler");

const login = async (req, res) => {
    // check if the user exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        //check if password matches
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            // sign token and send it in response
            const token = await generateToken(user);
            let rs = user;

            return responseSuccess(res, { user, token })
        } else {
            throw new HttpError(`Login fail`, 400)
        }
    } else {
        throw new HttpError(`Login fail`, 400)
    }
}

const register = async (req, res) => {
    // hash the password
    const exists = await UserModel.findOne({ email: req.body.email });
    if (exists) {
        throw new HttpError(`email is exits`, 400)
    }
    else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // create a new user
        const user = await UserModel.create(req.body);
        // send new user as response
        const token = await generateToken(user);
        return responseSuccess(res, { user, token })
    }

}

module.exports = {
    login,
    register
}