const mongoose = require("mongoose");
const Bike = require("./models/Bikes");
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bikes = [
  {
    name: "Bajaj Pulsar 150",
    priceRange: "₹85,549 - ₹93,613",
    finalPrice: "₹1,35,000",
    discount: "₹15,000 OFF",
    emiStartingFrom: "₹3,200/month",
    specs: {
      engine: "149.5cc",
      mileage: "45-50 km/l",
      maxPower: "12.4 BHP",
      fuelTank: "13L"
    },
    specialOffers: [
      "Zero down payment available",
      "Exchange bonus up to ₹10,000",
      "Extended warranty for 2 years"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹10,500/month" },
      { duration: "24 months", amount: "₹5,800/month" }
    ],
    image: "bike1.jpg"
  },
  {
    name: "Bajaj Pulsar NS200",
    priceRange: "₹1.42 - ₹1.48 Lakh",
    finalPrice: "₹1,48,000",
    discount: "₹8,000 OFF",
    emiStartingFrom: "₹4,100/month",
    specs: {
      engine: "199.5cc",
      mileage: "35-40 km/l",
      maxPower: "24.5 BHP",
      fuelTank: "12L"
    },
    specialOffers: [
      "Free riding gear worth ₹5,000",
      "Exchange bonus up to ₹15,000"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹12,900/month" },
      { duration: "24 months", amount: "₹6,700/month" }
    ],
    image: "bike2.jpg"
  },
  {
    name: "Bajaj Dominar 400",
    priceRange: "₹2.30 - ₹2.42 Lakh",
    finalPrice: "₹2,42,000",
    discount: "₹12,000 OFF",
    emiStartingFrom: "₹6,700/month",
    specs: {
      engine: "373.3cc",
      mileage: "25-30 km/l",
      maxPower: "40 BHP",
      fuelTank: "13L"
    },
    specialOffers: [
      "0% processing fee",
      "Exchange bonus up to ₹20,000"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹20,100/month" },
      { duration: "24 months", amount: "₹10,500/month" }
    ],
    image: "bike3.avif"
  },
  {
    name: "Bajaj Platina 110",
    priceRange: "₹70,000 - ₹76,000",
    finalPrice: "₹76,000",
    discount: "₹5,000 OFF",
    emiStartingFrom: "₹2,100/month",
    specs: {
      engine: "115.45cc",
      mileage: "70-80 km/l",
      maxPower: "8.6 BHP",
      fuelTank: "11L"
    },
    specialOffers: [
      "Lowest EMI in segment",
      "Exchange bonus up to ₹8,000"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹6,300/month" },
      { duration: "24 months", amount: "₹3,400/month" }
    ],
    image: "bk1.jpg"
  },
  {
    name: "Bajaj Avenger Cruise 220",
    priceRange: "₹1.42 - ₹1.49 Lakh",
    finalPrice: "₹1,49,000",
    discount: "₹7,000 OFF",
    emiStartingFrom: "₹4,100/month",
    specs: {
      engine: "220cc",
      mileage: "40-45 km/l",
      maxPower: "19.03 BHP",
      fuelTank: "13L"
    },
    specialOffers: [
      "Free cruiser jacket",
      "Exchange bonus up to ₹15,000"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹12,400/month" },
      { duration: "24 months", amount: "₹6,500/month" }
    ],
    image: "bk2.jpg"
  },
  {
    name: "Bajaj Pulsar RS200",
    priceRange: "₹1.72 - ₹1.78 Lakh",
    finalPrice: "₹1,78,000",
    discount: "₹10,000 OFF",
    emiStartingFrom: "₹4,900/month",
    specs: {
      engine: "199.5cc",
      mileage: "35 km/l",
      maxPower: "24.5 BHP",
      fuelTank: "13L"
    },
    specialOffers: [
      "Free racing kit",
      "Insurance discount 50%"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹14,800/month" },
      { duration: "24 months", amount: "₹7,700/month" }
    ],
    image: "bike2.jpg"
  },
  {
    name: "Bajaj CT110X",
    priceRange: "₹68,000 - ₹73,000",
    finalPrice: "₹73,000",
    discount: "₹4,000 OFF",
    emiStartingFrom: "₹2,000/month",
    specs: {
      engine: "115.45cc",
      mileage: "70 km/l",
      maxPower: "8.6 BHP",
      fuelTank: "12L"
    },
    specialOffers: [
      "Free helmet",
      "1 year service package"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹6,100/month" },
      { duration: "24 months", amount: "₹3,200/month" }
    ],
    image: "bike1.jpg"
  },
  {
    name: "Bajaj Pulsar N250",
    priceRange: "₹1.50 - ₹1.58 Lakh",
    finalPrice: "₹1,58,000",
    discount: "₹8,500 OFF",
    emiStartingFrom: "₹4,400/month",
    specs: {
      engine: "249.07cc",
      mileage: "35 km/l",
      maxPower: "24.5 BHP",
      fuelTank: "14L"
    },
    specialOffers: [
      "Free Bluetooth helmet",
      "Roadside assistance"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹13,200/month" },
      { duration: "24 months", amount: "₹6,900/month" }
    ],
    image: "bike3.avif"
  },
  {
    name: "Bajaj Platina 100",
    priceRange: "₹65,000 - ₹70,000",
    finalPrice: "₹70,000",
    discount: "₹3,500 OFF",
    emiStartingFrom: "₹1,900/month",
    specs: {
      engine: "102cc",
      mileage: "80 km/l",
      maxPower: "7.9 BHP",
      fuelTank: "11L"
    },
    specialOffers: [
      "No cost EMI",
      "5 year engine warranty"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹5,800/month" },
      { duration: "24 months", amount: "₹3,100/month" }
    ],
    image: "bk2.jpg"
  },
  {
    name: "Bajaj Chetak Electric",
    priceRange: "₹1.42 - ₹1.58 Lakh",
    finalPrice: "₹1,58,000",
    discount: "₹15,000 OFF",
    emiStartingFrom: "₹4,400/month",
    specs: {
      engine: "Electric",
      mileage: "95 km/charge",
      maxPower: "4.1 kW",
      fuelTank: "12L"
    },
    specialOffers: [
      "Free home charger",
      "Government subsidy available"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹13,200/month" },
      { duration: "24 months", amount: "₹6,900/month" }
    ],
    image: "bk1.jpg"
  },
  {
    name: "Bajaj Pulsar 125",
    priceRange: "₹80,000 - ₹86,000",
    finalPrice: "₹86,000",
    discount: "₹6,000 OFF",
    emiStartingFrom: "₹2,400/month",
    specs: {
      engine: "124.4cc",
      mileage: "55 km/l",
      maxPower: "11.8 BHP",
      fuelTank: "11.5L"
    },
    specialOffers: [
      "Free 3 services",
      "Exchange bonus ₹7,000"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹7,200/month" },
      { duration: "24 months", amount: "₹3,800/month" }
    ],
    image: "bike1.jpg"
  },
  {
    name: "Bajaj Avenger Street 160",
    priceRange: "₹1.20 - ₹1.28 Lakh",
    finalPrice: "₹1,28,000",
    discount: "₹5,000 OFF",
    emiStartingFrom: "₹3,500/month",
    specs: {
      engine: "160.3cc",
      mileage: "45 km/l",
      maxPower: "15 BHP",
      fuelTank: "13L"
    },
    specialOffers: [
      "Free touring kit",
      "Low EMI options"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹10,700/month" },
      { duration: "24 months", amount: "₹5,600/month" }
    ],
    image: "bike2.jpg"
  },
  {
    name: "Bajaj CT125X",
    priceRange: "₹75,000 - ₹80,000",
    finalPrice: "₹80,000",
    discount: "₹4,500 OFF",
    emiStartingFrom: "₹2,200/month",
    specs: {
      engine: "124.45cc",
      mileage: "65 km/l",
      maxPower: "10.8 BHP",
      fuelTank: "12L"
    },
    specialOffers: [
      "Free mobile holder",
      "2 years warranty"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹6,700/month" },
      { duration: "24 months", amount: "₹3,500/month" }
    ],
    image: "bike3.avif"
  },
  {
    name: "Bajaj Dominar 250",
    priceRange: "₹1.80 - ₹1.92 Lakh",
    finalPrice: "₹1,92,000",
    discount: "₹10,000 OFF",
    emiStartingFrom: "₹5,300/month",
    specs: {
      engine: "248.8cc",
      mileage: "32 km/l",
      maxPower: "27 BHP",
      fuelTank: "13L"
    },
    specialOffers: [
      "Free anti-theft alarm",
      "0% interest for 6 months"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹16,000/month" },
      { duration: "24 months", amount: "₹8,300/month" }
    ],
    image: "bk1.jpg"
  },
  {
    name: "Bajaj Pulsar 180F",
    priceRange: "₹1.15 - ₹1.22 Lakh",
    finalPrice: "₹1,22,000",
    discount: "₹7,000 OFF",
    emiStartingFrom: "₹3,400/month",
    specs: {
      engine: "178.6cc",
      mileage: "40 km/l",
      maxPower: "17 BHP",
      fuelTank: "15L"
    },
    specialOffers: [
      "Free insurance",
      "Extended warranty"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹10,200/month" },
      { duration: "24 months", amount: "₹5,300/month" }
    ],
    image: "bk2.jpg"
  },
  {
    name: "Bajaj Discover 125",
    priceRange: "₹75,000 - ₹82,000",
    finalPrice: "₹82,000",
    discount: "₹5,000 OFF",
    emiStartingFrom: "₹2,300/month",
    specs: {
      engine: "124.6cc",
      mileage: "65 km/l",
      maxPower: "11.8 BHP",
      fuelTank: "10L"
    },
    specialOffers: [
      "Fuel voucher worth ₹2,000",
      "Easy finance options"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹6,800/month" },
      { duration: "24 months", amount: "₹3,600/month" }
    ],
    image: "bike1.jpg"
  },
  {
    name: "Bajaj V15",
    priceRange: "₹75,000 - ₹82,000",
    finalPrice: "₹82,000",
    discount: "₹5,000 OFF",
    emiStartingFrom: "₹2,300/month",
    specs: {
      engine: "124.6cc",
      mileage: "65 km/l",
      maxPower: "11.8 BHP",
      fuelTank: "10L"
    },
    specialOffers: [
      "Made with INS Vikrant metal",
      "Special edition benefits"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹6,800/month" },
      { duration: "24 months", amount: "₹3,600/month" }
    ],
    image: "bike2.jpg"
  },
  {
    name: "Bajaj Platina H-Gear",
    priceRange: "₹78,000 - ₹84,000",
    finalPrice: "₹84,000",
    discount: "₹5,500 OFF",
    emiStartingFrom: "₹2,300/month",
    specs: {
      engine: "124.4cc",
      mileage: "70 km/l",
      maxPower: "11.8 BHP",
      fuelTank: "11L"
    },
    specialOffers: [
      "Gear indicator bonus",
      "Comfort seat upgrade"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹7,000/month" },
      { duration: "24 months", amount: "₹3,700/month" }
    ],
    image: "bike3.avif"
  },
  {
    name: "Bajaj Pulsar 220F",
    priceRange: "₹1.30 - ₹1.38 Lakh",
    finalPrice: "₹1,38,000",
    discount: "₹9,000 OFF",
    emiStartingFrom: "₹3,800/month",
    specs: {
      engine: "220cc",
      mileage: "40 km/l",
      maxPower: "20.93 BHP",
      fuelTank: "15L"
    },
    specialOffers: [
      "Free riding jacket",
      "Accident insurance"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹11,500/month" },
      { duration: "24 months", amount: "₹6,000/month" }
    ],
    image: "bk1.jpg"
  },
  {
    name: "Bajaj Avenger 160 Street",
    priceRange: "₹1.18 - ₹1.25 Lakh",
    finalPrice: "₹1,25,000",
    discount: "₹5,000 OFF",
    emiStartingFrom: "₹3,500/month",
    specs: {
      engine: "160.3cc",
      mileage: "45 km/l",
      maxPower: "15 BHP",
      fuelTank: "13L"
    },
    specialOffers: [
      "Customization options",
      "Easy loan approval"
    ],
    emiOptions: [
      { duration: "12 months", amount: "₹10,400/month" },
      { duration: "24 months", amount: "₹5,400/month" }
    ],
    image: "bk2.jpg"
  }
];

// Insert into MongoDB
const seedBikes = async () => {
  try {
    await Bike.deleteMany(); 
    await Bike.insertMany(bikes);
    console.log("✅ Bike data seeded successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedBikes();
