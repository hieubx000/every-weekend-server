import mongoose, { Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const BlogSchema = new Schema(
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
    category: {
      type: String,
      enum: ['kinh-nghiem', 'kien-thuc', 'chia-se'],
      default: 'chia-se',
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

const BlogModel = mongoose.model('Blog', BlogSchema);
export default BlogModel;
