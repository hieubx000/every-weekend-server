const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const BlogSchema = mongoose.Schema(
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
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogModel;
