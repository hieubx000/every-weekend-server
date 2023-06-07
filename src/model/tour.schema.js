const mongoose = require('mongoose');
// const mongoose = require('../common/database')()
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const TourSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const TourModel = mongoose.model('Tour', TourSchema);

module.exports = TourModel;
