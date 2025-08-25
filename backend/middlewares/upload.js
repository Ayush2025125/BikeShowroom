const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bike_showroom',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif'],
  },
});

const upload = multer({ storage });

module.exports = upload;