const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dislike', dislikeSchema);

