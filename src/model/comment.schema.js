const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema(
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
  }
);

const CommentModel = mongoose.model('Comment', CommentSchema, 'comments');

module.exports = CommentModel;
