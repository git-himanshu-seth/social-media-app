const { Post } = require("../models/postsSchema");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific post by ID
const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;

  try {
    const newPost = new Post({ content });
    const savedPost = await newPost.save();

    res.status(200).json({ savedPost, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post by ID
const updatePostById = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { content },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post, status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post by ID
const deletePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ status: 200, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
};
