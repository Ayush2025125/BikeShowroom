const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priceRange: {
    type: String,
    required: true
  },
  finalPrice: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  emiStartingFrom: {
    type: String,
    required: true
  },
  specs: {
    engine: {
      type: String,
      required: true
    },
    mileage: {
      type: String,
      required: true
    },
    maxPower: {
      type: String,
      required: true
    },
    fuelTank: {
      type: String,
      required: true
    }
  },
  specialOffers: [
    {
      type: String,
      required: true
    }
  ],
  emiOptions: [
    {
      duration: {
        type: String,
        required: true
      },
      amount: {
        type: String,
        required: true
      }
    }
  ],
  image: {
    type: String,
    required: true 
  }
});

module.exports = mongoose.model("Bike", bikeSchema);
