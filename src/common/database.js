const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/every-weekend';
// process.env.MONGO_URL ||
// // local
// const db_connect = "mongodb://localhost/vp_shop_project";
module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((rs) => console.log(`Connected`))
    .catch((err) => console.log(`ERR : ${err}`));
  return mongoose;
};
