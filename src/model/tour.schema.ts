import { Schema, Types, model } from 'mongoose';

const TourSchema = new Schema(
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
    startTime: {
      type: Date,
    },
    beforStartTime: {
      type: Date,
    },
    gatheringPlace: {
      type: String,
    },
    address: {
      type: String,
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    numOfDays: {
      type: Number,
      default: 0,
    },
    maxSlot: {
      type: Number,
      default: 1,
    },
    used: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    timeLine: {
      type: String,
    },
    tourGuide: {
      type: String,
    },
    note: {
      type: String,
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

const TourModel = model('Tour', TourSchema);

export default TourModel;
