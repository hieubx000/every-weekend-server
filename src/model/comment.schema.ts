import { Schema, Types, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
    blog: {
      type: Types.ObjectId,
      ref: 'Blog',
      require: true,
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
