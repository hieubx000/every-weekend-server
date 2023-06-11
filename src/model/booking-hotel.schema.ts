import { Schema, Types, model } from 'mongoose';

const BookingHotelSchema = new Schema(
  {
    cName: {
      type: String,
      required: true,
    },
    cEmail: {
      type: String,
      required: true,
    },
    cPhone: {
      type: String,
      required: true,
    },
    cAddress: {
      type: String,
    },

    customer: {
      type: [
        {
          fullName: {
            type: String,
          },
          gender: {
            type: Number,
            default: 0,
          },
          birthDay: {
            type: String,
          },
          cccd: {
            type: String,
          },
        },
      ],
    },
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
