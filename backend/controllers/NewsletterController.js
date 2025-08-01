const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already subscribed.' });
    }

    const newSub = new Newsletter({ email });
    await newSub.save();

    return res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (err) {
    console.error('Newsletter Subscribe Error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};
