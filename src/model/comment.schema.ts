import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
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

const CommentModel = model('Comment', CommentSchema);
export default CommentModel;
