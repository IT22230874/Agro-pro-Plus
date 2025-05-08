const Schedule = require('../../models/schedules/schedules');

// API route to handle the POST request from the React Native app
exports.saveSchedule = async (req, res) => {
  const { schedule } = req.body; // Expect schedule object from the request body

  try {
    // Create a new schedule document and save it to MongoDB
    const newSchedule = new Schedule(schedule);
    await newSchedule.save();

    res.status(200).json({ message: "Fertilizer schedule saved successfully!" });
  } catch (err) {
    console.error("Failed to save schedule:", err);
    res.status(500).json({ message: "Failed to save fertilizer schedule." });
  }
};


// Controller to retrieve all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (err) {
    console.error("Failed to retrieve schedules:", err);
    res.status(500).json({ message: "Failed to retrieve schedules." });
  }
};

// Controller to retrieve a schedule by ID
const mongoose = require('mongoose');

exports.getScheduleById = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid schedule ID.' });
    }

    try {
        const schedule = await FertilizerSchedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found.' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        console.error('Failed to retrieve schedule by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve schedule.' });
    }
};

// Controller to delete a schedule by ID
exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Schedule.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    res.status(200).json({ message: "Schedule deleted successfully." });
  } catch (err) {
    console.error("Failed to delete schedule:", err);
    res.status(500).json({ message: "Failed to delete schedule." });
  }
};


