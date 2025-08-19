const express = require('express');
const { exportContacts } = require('../controllers/ExportContoller');

const router = express.Router();

router.get('/export-contacts', exportContacts);

module.exports = router;
