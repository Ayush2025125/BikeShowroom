const Carousal = require("../models/Carousal");

exports.getCarousals = async (req, res) => {
  try {
    const Carousals = await Carousal.find();
    res.status(200).json(Carousals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCarousal = async (req, res) => {
  const { title, subtitle, description, image } = req.body;
  try {
    const newCarousal = new Carousal({ title, subtitle, description, image });
    await newCarousal.save();
    res.status(201).json(newCarousal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCarousal = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCarousal = await Carousal.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCarousal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCarousal = async (req, res) => {
  const { id } = req.params;
  try {
    await Carousal.findByIdAndDelete(id);
    res.status(200).json({ message: 'Carousal deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
