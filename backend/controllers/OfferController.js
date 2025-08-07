const Offer = require("../models/Offer");

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOffer = async (req, res) => {
  const { title, subtitle, description, image } = req.body;
  try {
    const newOffer = new Offer({ title, subtitle, description, image });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    await Offer.findByIdAndDelete(id);
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
