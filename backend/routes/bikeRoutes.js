const express = require("express");
const router = express.Router();
const bikeController = require("../controllers/BikeController");
// const verifyAdminToken = require("../middlewares/auth");

router.get("/", bikeController.getAllBikes);

router.post("/",  bikeController.addBike);
router.delete("/:id",  bikeController.deleteBike);
router.put("/:id",  bikeController.updateBike);

module.exports = router;
