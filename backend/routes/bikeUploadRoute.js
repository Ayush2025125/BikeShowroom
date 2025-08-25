const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/upload-bike-image', upload.single('bikeImage'), (req, res) => {
  try {
    res.status(200).json({
      success: true,
      url: req.file.path, 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
