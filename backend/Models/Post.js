const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
    {
      writer: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
      communityId: {
        type: Schema.Types.ObjectId,
        ref:'Community'
      },
      title: {
        type: String,
        required:true,
      },
      content: {
        type: String,
        required:true,
      },
    },
    { timestamps: true }
  );
  module.exports=mongoose.model("Posts",postSchema)