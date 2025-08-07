const mongoose = require("mongoose");
const Tyre = require("./models/Tyres");
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tyreData = [
  {
    brand: "MRF",
    model: "Zapper FX",
    images: ["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹3,500",
    originalPrice: "₹4,000",
    discount: "₹500 OFF",
    size: "100/80-17",
    type: "Tubeless",
    pattern: "Street/Sport",
    compound: "Dual Compound",
    maxLoad: "315 kg",
    maxSpeed: "150 km/h",
    offers: [
      "Buy 2 Get 1 Year Free Service",
      "Free installation and balancing",
      "6 months warranty",
      "Exchange old tyre for ₹200 off"
    ],
    features: [
      "Enhanced grip in wet and dry conditions",
      "Long lasting tread life",
      "Superior handling and stability",
      "Optimized for Indian road conditions",
      "Reduced rolling resistance for better mileage"
    ]
  },
  {
    brand: "CEAT",
    model: "Gripp X3",
    images: ["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹3,200",
    originalPrice: "₹3,800",
    discount: "₹600 OFF",
    size: "90/90-18",
    type: "Tube",
    pattern: "All-Terrain",
    compound: "Soft",
    maxLoad: "290 kg",
    maxSpeed: "130 km/h",
    offers: [
      "Free first service",
      "5% cashback on online orders"
    ],
    features: [
      "Dual compound technology for longer life",
      "Superior cornering stability"
    ]
  },
  {
    brand: "Michelin",
    model: "Pilot Street",
    images:["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹4,800",
    originalPrice: "₹5,300",
    discount: "₹500 OFF",
    size: "110/70-17",
    type: "Tubeless",
    pattern: "Street",
    compound: "Single",
    maxLoad: "280 kg",
    maxSpeed: "160 km/h",
    offers: [
      "3 months warranty",
      "Free balancing"
    ],
    features: [
      "Excellent wet grip",
      "Sporty design",
      "Low noise and vibration"
    ]
  },
  {
    brand: "Apollo",
    model: "ActiGrip R3",
    images: ["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹3,100",
    originalPrice: "₹3,500",
    discount: "₹400 OFF",
    size: "120/80-17",
    type: "Tube",
    pattern: "Off-road",
    compound: "Hard",
    maxLoad: "300 kg",
    maxSpeed: "140 km/h",
    offers: ["Free fitting", "Exchange bonus ₹150"],
    features: ["Great off-road traction", "Durable in rough terrains"]
  },
  {
    brand: "TVS Eurogrip",
    model: "ATT 455",
    images: ["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹2,900",
    originalPrice: "₹3,400",
    discount: "₹500 OFF",
    size: "90/90-17",
    type: "Tubeless",
    pattern: "Street",
    compound: "Medium",
    maxLoad: "270 kg",
    maxSpeed: "130 km/h",
    offers: ["3 services free"],
    features: ["Fuel efficient design", "Good grip on curves"]
  },
  {
    brand: "Ralco",
    model: "Speed Blaster",
    images: ["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹2,800",
    originalPrice: "₹3,200",
    discount: "₹400 OFF",
    size: "80/100-18",
    type: "Tube",
    pattern: "Street",
    compound: "Soft",
    maxLoad: "250 kg",
    maxSpeed: "120 km/h",
    offers: ["Free valve", "Limited warranty"],
    features: ["Lightweight", "Stable at high speed"]
  },
  {
    brand: "JK Tyre",
    model: "Blaze BR32",
    images: ["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹3,600",
    originalPrice: "₹4,100",
    discount: "₹500 OFF",
    size: "100/90-17",
    type: "Tubeless",
    pattern: "Sport",
    compound: "Dual",
    maxLoad: "310 kg",
    maxSpeed: "145 km/h",
    offers: ["Free alignment check", "Gift on purchase"],
    features: ["Aggressive tread", "Designed for sports bikes"]
  },
  {
    brand: "Pirelli",
    model: "Sport Demon",
    images:["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹5,500",
    originalPrice: "₹6,000",
    discount: "₹500 OFF",
    size: "130/70-17",
    type: "Tubeless",
    pattern: "Sport Touring",
    compound: "Medium",
    maxLoad: "320 kg",
    maxSpeed: "170 km/h",
    offers: ["Free install", "Scratch card worth ₹200"],
    features: ["Exceptional control", "Superior wet/dry performance"]
  },
  {
    brand: "Maxxis",
    model: "MA-PRO",
    images:["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹3,400",
    originalPrice: "₹3,900",
    discount: "₹500 OFF",
    size: "90/100-18",
    type: "Tube",
    pattern: "All-Rounder",
    compound: "Dual",
    maxLoad: "275 kg",
    maxSpeed: "135 km/h",
    offers: ["Free checkup after 500km"],
    features: ["Comfort ride", "Decent mileage"]
  },
  {
    brand: "Continental",
    model: "ContiGo!",
    images: ["tyre1.jpg", "tyre2.webp", "tyre3.jpg"],
    price: "₹4,200",
    originalPrice: "₹4,700",
    discount: "₹500 OFF",
    size: "110/80-17",
    type: "Tubeless",
    pattern: "Street/Performance",
    compound: "Soft",
    maxLoad: "295 kg",
    maxSpeed: "160 km/h",
    offers: ["5% discount on next service"],
    features: ["European quality", "Enhanced tread design"]
  }
];


// Insert into MongoDB
const seedTyres = async () => {
  try {
    await Tyre.deleteMany(); 
    await Tyre.insertMany(tyreData);
    console.log("✅ Tyre data seeded successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedTyres();
