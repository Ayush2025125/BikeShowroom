const Contact = require('../models/Contact');
const { sendConfirmationEmail } = require('../utils/email'); 

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    sendConfirmationEmail(email);

    res.status(201).json({ success: true, message: 'Message sent successfully and confirmation email sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
