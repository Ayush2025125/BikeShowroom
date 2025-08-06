const express = require("express");
const router = express.Router();
const bikeController = require("../controllers/BikeController");
const verifyAdminToken = require("../middlewares/auth");

router.get("/", bikeController.getAllBikes);

router.post("/", verifyAdminToken, bikeController.addBike);
router.delete("/:id", verifyAdminToken, bikeController.deleteBike);
router.put("/:id", verifyAdminToken, bikeController.updateBike);

module.exports = router;
