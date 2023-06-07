import mongoose, { Schema, model } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const TourSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'title',
      unique: true,
      lowercase: true,
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
