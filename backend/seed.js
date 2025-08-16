const mongoose = require("mongoose");
const carousal = require("./models/Carousal");
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

  const data = [
    {
      title: "Unbeatable Bike Deals",
      subtitle: "Ride the Best for Less",
      description: "Check out our latest collection of budget-friendly bikes with top-notch performance.",
      image: "bike1.jpg"
    },
    {
      title: "Top Brands, Great Prices",
      subtitle: "Choose from Trusted Names",
      description: "Browse bikes from Yamaha, Honda, KTM, and more — all in one place.",
      image: "bike3.avif"
    },
    {
      title: "Finance Options Available",
      subtitle: "Own Now, Pay Later",
      description: "Easy EMI plans on all two-wheelers. Get your dream bike without the wait.",
      image: "bk1.jpg"
    },
    {
      title: "Service at Your Doorstep",
      subtitle: "Hassle-Free Bike Maintenance",
      description: "Book bike servicing online and enjoy expert care from the comfort of your home.",
      image: "bike2.jpg"
    }
  ];



// Insert into MongoDB
const seedTyres = async () => {
  try {
    await carousal.deleteMany(); 
    await carousal.insertMany(data);
    console.log("✅ Tyre data seeded successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    mongoose.connection.close();
  }
};

seedTyres();
