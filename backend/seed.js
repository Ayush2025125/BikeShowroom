const mongoose = require("mongoose");
const bike = require("./models/Bikes");
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const data = [
  {
    name: "Pulsar 125",
    priceRange: "₹85–94 k",
    finalPrice: "₹86 k",
    discount: "₹3 k",
    emiStartingFrom: "₹1,700/month",
    specs: { engine: "124.4 cc", mileage: "50 kmpl", maxPower: "11.8 PS", fuelTank: "11.5 L" },
    specialOffers: ["Festive voucher ₹2,000"],
    emiOptions: [{ duration: "36 months", amount: "₹1,700" }],
    image: ["bike1.jpg", "bike2.jpg", "bike3.avif"],
    availableColors: ["Black Silver", "Black Red", "Blue Carbon Fibre"],
    priority: 1
  },
  {
    name: "Pulsar 150",
    priceRange: "₹1.10–1.21 L",
    finalPrice: "₹1.15 L",
    discount: "₹5 k",
    emiStartingFrom: "₹4,300/month",
    specs: { engine: "149.5 cc", mileage: "47 kmpl", maxPower: "13.8 PS", fuelTank: "15 L" },
    specialOffers: ["HDFC cashback ₹5,000"],
    emiOptions: [{ duration: "36 months", amount: "₹4,300" }],
    image: ["bike2.jpg", "bk1.jpg", "bk2.jpg"],
    availableColors: ["Sparkle Black Red", "Sparkle Black Silver", "Sapphire Black Blue"],
    priority: 2
  },
  {
    name: "Pulsar N160",
    priceRange: "₹1.23–1.38 L",
    finalPrice: "₹1.33 L",
    discount: "₹10 k",
    emiStartingFrom: "₹5,500/month",
    specs: { engine: "164.8 cc", mileage: "47 kmpl", maxPower: "16 PS", fuelTank: "14 L" },
    specialOffers: ["Dual-channel ABS save ₹3k"],
    emiOptions: [{ duration: "36 months", amount: "₹5,500" }],
    image: ["bk1.jpg", "bike3.avif", "bike1.jpg"],
    availableColors: ["Brooklyn Black", "Polar Sky Blue", "Glossy Racing Red"],
    priority: 3
  },
  {
    name: "Pulsar NS200",
    priceRange: "₹1.40–1.60 L",
    finalPrice: "₹1.50 L",
    discount: "₹10 k",
    emiStartingFrom: "₹6,000/month",
    specs: { engine: "199.5 cc liquid-cooled", mileage: "35 kmpl", maxPower: "24.5 PS", fuelTank: "12 L" },
    specialOffers: ["Festive cashback ₹5k"],
    emiOptions: [{ duration: "36 months", amount: "₹6,000" }],
    image: ["bike2.jpg", "bike1.jpg", "bk1.jpg"],
    availableColors: ["Blue", "Red", "Black"],
    priority: 4
  },
  {
    name: "Pulsar RS200",
    priceRange: "₹1.80–1.90 L",
    finalPrice: "₹1.85 L",
    discount: "₹10 k",
    emiStartingFrom: "₹6,100/month",
    specs: { engine: "199.5 cc FI", mileage: "35 kmpl", maxPower: "24.5 PS", fuelTank: "12 L" },
    specialOffers: ["Free helmet"],
    emiOptions: [{ duration: "36 months", amount: "₹6,100" }],
    image: ["bike3.avif", "bk2.jpg", "bk1.jpg"],
    availableColors: ["Red", "Silver", "Black"],
    priority: 5
  },
  {
    name: "Pulsar N250",
    priceRange: "₹1.50–1.60 L",
    finalPrice: "₹1.55 L",
    discount: "₹9 k",
    emiStartingFrom: "₹6,500/month",
    specs: { engine: "249.5 cc oil-cooled", mileage: "42 kmpl", maxPower: "24.5 PS", fuelTank: "14 L" },
    specialOffers: ["Dual-channel ABS bonus ₹3k"],
    emiOptions: [{ duration: "36 months", amount: "₹6,500" }],
    image: ["bike1.jpg", "bike2.jpg", "bike3.avif"],
    availableColors: ["Red", "Blue", "Techno Grey", "Brooklyn Black"],
    priority: 6
  },
  {
    name: "Dominar 400",
    priceRange: "₹2.30–2.45 L",
    finalPrice: "₹2.35 L",
    discount: "₹10 k",
    emiStartingFrom: "₹7,800/month",
    specs: { engine: "373.3 cc liquid-cooled", mileage: "30 kmpl", maxPower: "40 PS", fuelTank: "13 L" },
    specialOffers: ["Exchange bonus ₹5k"],
    emiOptions: [{ duration: "36 months", amount: "₹7,800" }],
    image: ["bk1.jpg", "bk2.jpg", "bike1.jpg"],
    availableColors: ["Glossy Black", "Matte Blue", "Red"],
    priority: 7
  },
  {
    name: "Avenger Street 160",
    priceRange: "₹1.50–1.60 L",
    finalPrice: "₹1.55 L",
    discount: "₹5 k",
    emiStartingFrom: "₹5,600/month",
    specs: { engine: "160 cc DTS-i", mileage: "50 kmpl", maxPower: "15 PS", fuelTank: "14 L" },
    specialOffers: ["Loyalty ₹3k"],
    emiOptions: [{ duration: "36 months", amount: "₹5,600" }],
    image: ["bike2.jpg", "bike3.avif", "bike1.jpg"],
    availableColors: ["Matte Black", "Red"],
    priority: 8
  },
  {
    name: "Avenger Cruise 220",
    priceRange: "₹1.85–1.95 L",
    finalPrice: "₹1.90 L",
    discount: "₹5 k",
    emiStartingFrom: "₹6,300/month",
    specs: { engine: "220 cc DTS-i", mileage: "45 kmpl", maxPower: "20 PS", fuelTank: "14 L" },
    specialOffers: ["Free jacket"],
    emiOptions: [{ duration: "36 months", amount: "₹6,300" }],
    image: ["bike3.avif", "bk1.jpg", "bk2.jpg"],
    availableColors: ["Matte Black", "Silver"],
    priority: 9
  },
  {
    name: "Platina 100",
    priceRange: "₹89 k",
    finalPrice: "₹86 k",
    discount: "₹3 k",
    emiStartingFrom: "₹1,700/month",
    specs: { engine: "100 cc", mileage: "70 kmpl", maxPower: "8 PS", fuelTank: "11 L" },
    specialOffers: ["Gift voucher ₹2k"],
    emiOptions: [{ duration: "36 months", amount: "₹1,700" }],
    image: ["bk1.jpg", "bike1.jpg", "bike2.jpg"],
    availableColors: ["Blue", "Red", "Black"],
    priority: 10
  },
  {
    name: "Platina 110",
    priceRange: "₹93 k",
    finalPrice: "₹90 k",
    discount: "₹3 k",
    emiStartingFrom: "₹1,800/month",
    specs: { engine: "115 cc 5-speed", mileage: "65 kmpl", maxPower: "9 PS", fuelTank: "12 L" },
    specialOffers: ["First service free"],
    emiOptions: [{ duration: "36 months", amount: "₹1,800" }],
    image: ["bike2.jpg", "bk2.jpg", "bike3.avif"],
    availableColors: ["Red", "Black", "Green"],
    priority: 11
  },
  {
    name: "CT 110",
    priceRange: "₹91 k",
    finalPrice: "₹88 k",
    discount: "₹3 k",
    emiStartingFrom: "₹1,750/month",
    specs: { engine: "110 cc", mileage: "60 kmpl", maxPower: "8.5 PS", fuelTank: "12 L" },
    specialOffers: ["Helmet included"],
    emiOptions: [{ duration: "36 months", amount: "₹1,750" }],
    image: ["bike1.jpg", "bike2.jpg", "bk1.jpg"],
    availableColors: ["Gloss Flame Red", "Ebony Black", "Matte Olive"],
    priority: 12
  },
  {
    name: "Pulsar 220F",
    priceRange: "₹1.30–1.40 L",
    finalPrice: "₹1.32 L",
    discount: "₹7.4 k",
    emiStartingFrom: "₹5,800/month",
    specs: { engine: "220 cc air-cooled", mileage: "40 kmpl", maxPower: "20 PS", fuelTank: "15 L" },
    specialOffers: ["Exchange ₹5k"],
    emiOptions: [{ duration: "36 months", amount: "₹5,800" }],
    image: ["bike3.avif", "bk2.jpg", "bike1.jpg"],
    availableColors: ["Black Red", "Blue", "Black Silver"],
    priority: 13
  },
  {
    name: "Freedom 125 (CNG)",
    priceRange: "₹95 k–1.10 L",
    finalPrice: "₹1.05 L",
    discount: "₹5 k",
    emiStartingFrom: "₹3,900/month",
    specs: { engine: "125 cc petrol + CNG", mileage: "60 kmpl petrol, 90 kmpl CNG", maxPower: "11.6 PS", fuelTank: "2 L + CNG kit" },
    specialOffers: ["Free CNG kit install"],
    emiOptions: [{ duration: "36 months", amount: "₹3,900" }],
    image: ["bk1.jpg", "bike2.jpg", "bike3.avif"],
    availableColors: ["Blue", "Red"],
    priority: 14
  },
  {
    name: "Chetak Electric",
    priceRange: "₹99 k–1.46 L",
    finalPrice: "₹1.40 L",
    discount: "₹6 k",
    emiStartingFrom: "₹4,500/month",
    specs: { engine: "4 kW BLDC", mileage: "90 km range", maxPower: "4 kW", fuelTank: "—" },
    specialOffers: ["Free home charger"],
    emiOptions: [{ duration: "36 months", amount: "₹4,500" }],
    image: ["bike2.jpg", "bk2.jpg", "bike1.jpg"],
    availableColors: ["Matte Blue", "Matte Black", "Pearl White"],
    priority: 15
  },
  {
    name: "Platina 110 H-Gear",
    priceRange: "₹55 k",
    finalPrice: "₹52 k",
    discount: "₹3 k",
    emiStartingFrom: "₹1,100/month",
    specs: { engine: "115 cc 5-speed", mileage: "65 kmpl", maxPower: "9 PS", fuelTank: "12 L" },
    specialOffers: ["Gear-knob upgrade"],
    emiOptions: [{ duration: "36 months", amount: "₹1,100" }],
    image: ["bike3.avif", "bike1.jpg", "bike2.jpg"],
    availableColors: ["Red", "Black"],
    priority: 16
  },
  {
    name: "Avenger Street 220",
    priceRange: "₹1.80–1.90 L",
    finalPrice: "₹1.85 L",
    discount: "₹5 k",
    emiStartingFrom: "₹6,200/month",
    specs: { engine: "220 cc DTS-i", mileage: "45 kmpl", maxPower: "20 PS", fuelTank: "14 L" },
    specialOffers: ["Free gloves"],
    emiOptions: [{ duration: "36 months", amount: "₹6,200" }],
    image: ["bk2.jpg", "bike2.jpg", "bike3.avif"],
    availableColors: ["Matte Black", "Silver"],
    priority: 17
  },
  {
    name: "Pulsar NS125",
    priceRange: "₹1.00–1.08 L",
    finalPrice: "₹1.05 L",
    discount: "₹5 k",
    emiStartingFrom: "₹4,300/month",
    specs: { engine: "124.45 cc", mileage: "49 kmpl", maxPower: "11.8 PS", fuelTank: "12 L" },
    specialOffers: ["Cashback ₹5k"],
    emiOptions: [{ duration: "36 months", amount: "₹4,300" }],
    image: ["bike1.jpg", "bk1.jpg", "bk2.jpg"],
    availableColors: ["Black Blue", "Black Red", "Silver"],
    priority: 18
  },
  {
    name: "Dominar 250",
    priceRange: "₹1.55–1.65 L",
    finalPrice: "₹1.60 L",
    discount: "₹5 k",
    emiStartingFrom: "₹5,600/month",
    specs: { engine: "250 cc liquid-cooled", mileage: "35 kmpl", maxPower: "26.6 bhp", fuelTank: "13 L" },
    specialOffers: ["Free saddle bag"],
    emiOptions: [{ duration: "36 months", amount: "₹5,600" }],
    image: ["bike2.jpg", "bike3.avif", "bk1.jpg"],
    availableColors: ["Red", "Blue", "Black"],
    priority: 19
  },
  {
    name: "Pulsar NS400Z",
    priceRange: "₹1.90–2.00 L",
    finalPrice: "₹1.95 L",
    discount: "₹7 k",
    emiStartingFrom: "₹6,800/month",
    specs: { engine: "373 cc liquid-cooled", mileage: "30 kmpl", maxPower: "40 PS+", fuelTank: "13 L" },
    specialOffers: ["Quickshift tech included"],
    emiOptions: [{ duration: "36 months", amount: "₹6,800" }],
    image: ["bk2.jpg", "bike1.jpg", "bike2.jpg"],
    availableColors: ["Matte Black", "Red", "Grey"],
    priority: 20
  }
];



// Insert into MongoDB
const seedTyres = async () => {
  try {
    await bike.deleteMany(); 
    await bike.insertMany(data);
    console.log("✅ Tyre data seeded successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedTyres();
