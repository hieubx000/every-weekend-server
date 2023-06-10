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
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
    imageUrl: {
      type: [String],
      default: [],
    },
    about: {
      type: String,
      default: '',
    },
    startTime: {
      type: Number,
      default: 0,
    },
    beforStartTime: {
      type: Number,
      default: 0,
    },
    gatheringPlace: {
      type: [
        {
          address: String,
          latitude: Number,
          longitude: Number,
        },
      ],
    },
    fromDate: {
      type: Number,
      default: 0,
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
    discount: {
      type: Number,
      default: 0,
    },
    sightseeing: {
      type: [String],
      default: [],
    },
    vehicle: {
      type: [String],
    },
    schedule: {
      type: [
        {
          label: String,
          content: String,
        },
      ],
    },
    tourGuide: {
      type: String,
      default: '',
    },
    fromDestination: {
      type: Number,
      default: 1,
    },
    toDestination: {
      type: Types.ObjectId,
      ref: 'Destination',
    },
    introduction: {
      type: String,
      default: '',
    },
    introLink: {
      type: String,
      default: '',
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
