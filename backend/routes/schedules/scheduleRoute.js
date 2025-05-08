const express = require('express');
const router = express.Router();
const scheduleCtrl = require('../../controllers/schedules/scheduleCtrl');

// Route to save a schedule
router.post("/save", scheduleCtrl.saveSchedule);
router.get("/", scheduleCtrl.getAllSchedules);
router.get("/:id", scheduleCtrl.getScheduleById);
router.delete("/:id", scheduleCtrl.deleteSchedule);

module.exports = router; // Make sure to export the router
