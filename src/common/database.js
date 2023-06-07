const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/every-weekend';
module.exports = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log(`Connected`))
    .catch((err) => console.log(`ERR : ${err}`));
  return mongoose;
};
