// routes/noticesRoute.js
const express = require("express");
const router = express.Router();
const noticeController = require("../../controllers/Community/noticeController");

// Get all notices
router.get("/", noticeController.getNotices);

// Add a new notice
router.post("/", noticeController.addNotice);

// Update a notice
router.put("/:id", noticeController.updateNotice);

// Delete a notice
router.delete("/:id", noticeController.deleteNotice);

module.exports = router;
