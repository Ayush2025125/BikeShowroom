const mongoose = require("mongoose");

const tyreSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },
  price: {
    type: String,
    required: true
  },
  originalPrice: {
    type: String,
  },
  discount: {
    type: String,
  },
  size: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  pattern: {
    type: String, 
  },
  compound: {
    type: String,  
  },
  maxLoad: {
    type: String,
  },
  maxSpeed: {
    type: String,
  },
  offers: { 
    type: [String],
    default: []
  },
  features: {
    type: [String], 
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
   priority: {
    type: Number,
    default: 1,
    min: 1
  }
});

module.exports = mongoose.model("Tyre", tyreSchema);
