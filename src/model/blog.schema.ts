import mongoose, { Schema, Types } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: Number,
      default: 1,
    },
    imageUrl: {
      type: String,
    },
    content: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    status: {
      type: Number,
      default: 1,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
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

const BlogModel = mongoose.model('Blog', BlogSchema);
export default BlogModel;
