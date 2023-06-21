import { Schema, Types, model } from 'mongoose';

const RateHotelSchema = new Schema(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
    hotel: {
      type: Types.ObjectId,
      ref: 'Hotel',
    },
    context: {
      type: String,
      default: null,
      required: true,
    },
    rate: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  },
);

const RateHotelModel = model('RateHotel', RateHotelSchema);
export default RateHotelModel;
