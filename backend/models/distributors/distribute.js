const mongoose = require("mongoose");

const distribute = mongoose.Schema({
  business_name: {
    type: String,
    required: true,
  },
  registation_no: {
    type: String,
    required: true,
  },
  situated_place: {
    type: String,
    required: true,
  },
  location: {
    type: {
      lat: { type: Number, required: true }, // Latitude
      lng: { type: Number, required: true }, // Longitude
    },
    required: true,
  },
  Owner_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone_no: {
    type: String,
    required: true,
    trim: true,
  },
});

const distributes = mongoose.model("distribute", distribute);
module.exports = distributes;
