import mongoose, { Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const DestinationSchema = new Schema(
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
  },
  {
    timestamps: true,
  },
);

const DestinationModel = mongoose.model('destination', DestinationSchema);
export default DestinationModel;
