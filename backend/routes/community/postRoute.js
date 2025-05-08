// routes/postRoute.js
const express = require("express");
const router = express.Router();
const postController = require("../../controllers/Community/postController");

// Get all posts
router.get("/", postController.getPosts);

// Add a new post
router.post("/", postController.addPost);

// Update a post
router.put("/:id", postController.updatePost);

// Delete a post
router.delete("/:id", postController.deletePost);


module.exports = router;
