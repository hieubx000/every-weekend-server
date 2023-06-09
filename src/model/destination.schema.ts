import mongoose, { Schema } from 'mongoose';

const DestinationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
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

const DestinationModel = mongoose.model('Destination', DestinationSchema);
export default DestinationModel;
