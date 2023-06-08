import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/every-weekend';
export const database = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log(`Connected`))
    .catch((err: any) => console.log(`ERR : ${err}`));
  return mongoose;
};
