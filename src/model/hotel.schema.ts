import mongoose, { Schema, Types } from 'mongoose';

const HotelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const HotelModel = mongoose.model('Hotel', HotelSchema);
export default HotelModel;
