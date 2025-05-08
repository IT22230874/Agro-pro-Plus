const mongoose = require("mongoose");

const stock = mongoose.Schema({
  business_name: {
    type: String,
    required: true,
  },

  ferti_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  location: {
    type: {
      lat: { type: Number, required: true }, // Latitude
      lng: { type: Number, required: true }, // Longitude
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  availability: {
    type: String,
    required: true,
    trim: true,
  },
});

const stocks = mongoose.model("stock", stock);

module.exports = stocks;
