const express = require('express');
const {getCarousals, createCarousal, updateCarousal, deleteCarousal} = require("../controllers/CarousalController");

const router = express.Router();

router.get('/', getCarousals);
router.post('/', createCarousal);
router.put('/:id', updateCarousal);
router.delete('/:id', deleteCarousal);

module.exports = router;
