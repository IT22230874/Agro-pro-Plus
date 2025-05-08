// controllers/postController.js
const Post = require("../../models/community/postModel");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new post
exports.addPost = async (req, res) => {
  //const { text, image } = req.body;

  // if (!text) {
  //   return res.status(400).json({ message: "Text is required" });
  // }

  const post = new Post({
    text: req.body.text,
    image: req.body.image,
   });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { text, image } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.text = text || post.text;
    post.image = image || post.image;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};
