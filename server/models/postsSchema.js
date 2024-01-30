const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Post Schema
const postSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

// Create mongoose models
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Post, Comment };
