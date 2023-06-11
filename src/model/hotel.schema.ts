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
    price: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
    address: {
      type: [
        {
          address: String,
          latitude: Number,
          longitude: Number,
        },
      ],
    },
    toDestination: {
      type: Types.ObjectId,
      ref: 'Destination',
    },
    imageUrl: {
      type: [String],
    },
    introduction: {
      type: String,
    },
    introLink: {
      type: String,
    },
    hotelService: {
      type: [Number],
    },
    rule: {
      type: {
        checkIn: String,
        checkOut: String,
      },
    },
    availability: {
      type: [
        {
          title: String,
          imageUrl: String,
          acreage: Number,
          noOfBeds: Number,
          amount: Number,
          price: Number,
          quantity: Number,
          roomService: [Number],
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const HotelModel = mongoose.model('Hotel', HotelSchema);
export default HotelModel;
