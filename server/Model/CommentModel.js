const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', 
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    require: true,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
