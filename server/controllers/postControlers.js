const { Post } = require("../models/postsSchema");
const {Friendship} = require("../models/friendRequestSchema");
const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const newPost = new Post({
      user: userId,
      userId: userId,
      content,
    });

    const savedPost = await newPost.save();
if (savedPost){
     return res.status(200).json({message:"Post created successfully", status: 'success'})};
     return  res.status(500).json({ error: 'Internal Server Error' });
  } catch (error) {
   return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const friends = Friendship.findOne({ user_id: req.params.id })
    
    const posts = await Post.find({ _id: { $in: friends } }).populate('user').populate('comments.user');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // const userId = req.user.id;

    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );


    res.status(200).json({data:post, message: 'get posts list successfully', });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, userId } = req.body;



    const comment = new Comment({
      user: userId,
      content,
    });

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    ).populate('comments.user');


    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllPosts, likePost, addComment, createPost };