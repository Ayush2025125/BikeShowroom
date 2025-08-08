const Bike = require("../models/Bikes");

exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ priority: 1 }); 
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bikes." });
  }
};

exports.getTop3Bikes = async (req, res) => {
  try {
    const bikes = await Bike.find().sort({ priority: 1 }).limit(3); 
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top 3 bikes." });
  }
};

exports.addBike = async (req, res) => {
    try {
        const newBike = new Bike(req.body);
        await newBike.save();
        res.status(201).json(newBike);
    } catch (err) {
        res.status(400).json({ error: `${err}` });
    }
}

exports.deleteBike = async (req, res) => {
  try {
    const deleted = await Bike.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Bike not found." });
    res.status(200).json({ message: "Bike deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete bike." });
  }
};

exports.updateBike = async (req, res) => {
  try {
    const updated = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Bike not found." });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update bike." });
  }
};