import { Schema, Types, model } from 'mongoose';

const RateTourSchema = new Schema(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
    tour: {
      type: Types.ObjectId,
      ref: 'Tour',
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

const RateTourModel = model('RateTour', RateTourSchema);
export default RateTourModel;
