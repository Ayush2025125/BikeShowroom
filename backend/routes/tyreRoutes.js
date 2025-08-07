const express = require("express");
const router = express.Router();
const tyreController = require("../controllers/TyreController");

// GET all tyres
router.get("/", tyreController.getAllTyres);

// GET a single tyre by ID
router.get("/:id", tyreController.getTyreById);

// POST a new tyre
router.post("/", tyreController.createTyre);

// PUT/update tyre
router.put("/:id", tyreController.updateTyre);

// DELETE tyre
router.delete("/:id", tyreController.deleteTyre);

module.exports = router;
