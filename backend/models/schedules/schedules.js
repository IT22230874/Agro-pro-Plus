const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  crop_type: String,
  planting_date: String,
  estimated_harvesting_date: String,
  estimated_total_cost: String,
  area_size: String,
  soil_condition: {
    nitrogen: Number,
    pH: Number,
  },

  growth_stages: [
    {
      stage: String,
      amount: String,
      cost: String,
      application_date: String,
      fertilizer_type: String,
      notes: String,
    },
  ],
});

// Create a model for the schedule schema
const Schedule  = mongoose.model("fertilizer_schedule", scheduleSchema);

module.exports = Schedule; // Export the Schedule model
