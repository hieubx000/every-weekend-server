import { Schema, Types, model } from 'mongoose';

const BookingHotelSchema = new Schema(
  {
    totalCustomer: {
      type: Number,
      default: 1,
    },
    totalRoom: {
      type: Number,
    },
    room: {
      type: {
        title: String,
        imageUrl: String,
        acreage: Number,
        noOfBeds: Number,
        amount: Number,
        price: Number,
        quantity: Number,
        roomService: [Number],
      },
    },
    totalPrice: {
      type: Number,
    },
    checkIn: {
      type: Number,
    },
    checkOut: {
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
      default: 1,
    },
  },
  { timestamps: true },
);

const BookingHotelModel = model('BookingHotel', BookingHotelSchema);

export default BookingHotelModel;
