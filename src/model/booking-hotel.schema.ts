import { Schema, Types, model } from 'mongoose';

const BookingHotelSchema = new Schema(
  {
    totalCustomer: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
    },
    note: {
      type: String,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel: {
      type: Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true },
);

const BookingHotelModel = model('BookingHotel', BookingHotelSchema);

export default BookingHotelModel;
