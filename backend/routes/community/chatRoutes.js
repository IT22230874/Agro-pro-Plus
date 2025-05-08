// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/Community/chatController");

// Create a new chat message
router.post("/", chatController.createChat);

// Get all chat messages
router.get("/", chatController.getChats);

// Update a chat message
router.put("/:id", chatController.updateChat);

// Delete a chat message
router.delete("/:id", chatController.deleteChat);

module.exports = router;
