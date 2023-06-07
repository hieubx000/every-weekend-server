const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/every-weekend-web.appspot.com/o/user.png?alt=media&token=265afdcd-b727-470d-9733-9b68d6d596b6&_gl=1*zv3itp*_ga*MjMxNjM4MDE1LjE2ODMwOTkwMDU.*_ga_CW55HF8NVT*MTY4NjA2ODE4MS44LjEuMTY4NjA2ODI3NC4wLjAuMA..",
    },
    birthday: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: Number,
      default: 0,
    },
    address: {
      type: Number,
      default: 1,
    },
    role: {
      require: true,
      type: String,
      enum: ["customer", "supplier", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
