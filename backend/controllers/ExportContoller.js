const Contact = require('../models/Contact');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

exports.exportContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0) {
      return res.status(404).json({ success: false, message: 'No contacts found' });
    }

    // 2. Convert to CSV
    const fields = ['_id', 'name', 'email', 'phone', 'message', 'createdAt'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(contacts);

    // 3. Save to file
    const filePath = path.join(__dirname, '../exports/contacts.csv');
    fs.writeFileSync(filePath, csv);

    // 4. Delete records from DB
    await Contact.deleteMany({});

    // 5. Send file to client
    res.download(filePath, 'contacts.csv', (err) => {
      if (err) {
        console.error('File download error:', err);
      }
      fs.unlinkSync(filePath);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
