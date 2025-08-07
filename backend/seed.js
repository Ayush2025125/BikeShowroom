const mongoose = require("mongoose");
const offer = require("./models/Offer");
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const offers = [
  {
    title: "Mega Monsoon Offer",
    subtitle: "Get flat ₹10,000 off",
    description: "Buy your dream bike this monsoon and avail flat ₹10,000 off on select models.",
    image: "monsoon_offer.jpg"
  },
  {
    title: "Festive Ride Bonanza",
    subtitle: "Free Accessories Worth ₹5,000",
    description: "Celebrate this festive season with free bike accessories on every purchase.",
    image: "festive_bonanza.jpg"
  },
  {
    title: "Exchange Carnival",
    subtitle: "Exchange Bonus ₹7,500",
    description: "Exchange your old bike and get an instant bonus up to ₹7,500.",
    image: "exchange_offer.jpg"
  },
  {
    title: "Student Special Deal",
    subtitle: "Extra ₹3,000 Discount",
    description: "College students get an exclusive ₹3,000 off on their first bike.",
    image: "student_deal.jpg"
  },
  {
    title: "Corporate Combo",
    subtitle: "Corporate Buyers Save More",
    description: "Corporate employees enjoy additional discounts and free insurance.",
    image: "corporate_offer.jpg"
  },
  {
    title: "EMI Festival",
    subtitle: "EMI starting at ₹999",
    description: "Now own your bike with EMIs starting at just ₹999 per month.",
    image: "emi_offer.jpg"
  },
  {
    title: "Weekend Flash Sale",
    subtitle: "Limited Time Offer",
    description: "Grab your favorite bike this weekend with exclusive time-bound discounts.",
    image: "weekend_sale.jpg"
  },
  {
    title: "Refer & Earn",
    subtitle: "Earn ₹1,000 Per Referral",
    description: "Refer a friend and earn ₹1,000 when they purchase any bike.",
    image: "refer_offer.jpg"
  },
  {
    title: "Zero Down Payment",
    subtitle: "Just Ride Away",
    description: "Pay nothing upfront! Ride your bike with zero down payment today.",
    image: "zero_down.jpg"
  },
  {
    title: "Anniversary Celebration",
    subtitle: "Store Anniversary Deal",
    description: "Celebrate our anniversary with exclusive offers and surprise gifts.",
    image: "anniversary_offer.jpg"
  },
];

// Insert into MongoDB
const seedTyres = async () => {
  try {
    await offer.deleteMany(); 
    await offer.insertMany(offers);
    console.log("✅ Tyre data seeded successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedTyres();
