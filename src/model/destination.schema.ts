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
    imageUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

const DestinationModel = mongoose.model('Destination', DestinationSchema);
export default DestinationModel;
