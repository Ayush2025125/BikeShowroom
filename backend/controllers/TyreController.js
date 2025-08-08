const Tyre = require("../models/Tyres");


exports.getAllTyres = async (req, res) => {
  try {
    const tyres = await Tyre.find().sort({ priority: 1 });
    res.status(200).json(tyres);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getTop3Tyres = async (req, res) => {
  try { 
    const tyres = await Tyre.find().sort({ priority: 1 }).limit(3);
    res.status(200).json(tyres);
  } catch (error) {
    console.error("Error in getTop3Tyres:", error);
    res.status(500).json({ error: "Failed to fetch top 3 Tyres." });
  }
};


exports.getTyreById = async (req, res) => {
  try {
    const tyre = await Tyre.findById(req.params.id);
    if (!tyre) return res.status(404).json({ message: "Tyre not found" });
    res.status(200).json(tyre);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.createTyre = async (req, res) => {
  try {
    const newTyre = new Tyre(req.body);
    await newTyre.save();
    res.status(201).json({ message: "Tyre added successfully", tyre: newTyre });
  } catch (error) {
    res.status(400).json({ message: "Failed to add tyre", error });
  }
};


exports.updateTyre = async (req, res) => {
  try {
    const updatedTyre = await Tyre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedTyre) return res.status(404).json({ message: "Tyre not found" });
    res.status(200).json({ message: "Tyre updated", tyre: updatedTyre });
  } catch (error) {
    res.status(400).json({ message: "Failed to update tyre", error });
  }
};


exports.deleteTyre = async (req, res) => {
  try {
    const deleted = await Tyre.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tyre not found" });
    res.status(200).json({ message: "Tyre deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tyre", error });
  }
};
