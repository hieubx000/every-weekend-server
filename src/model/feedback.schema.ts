import mongoose, { Schema } from 'mongoose';

const FeedBackSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      default: 'day la avatar',
    },
    avatar: {
      type: String,
    },
    content: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const FeedbackModel = mongoose.model('Feedback', FeedBackSchema);
export default FeedbackModel;
