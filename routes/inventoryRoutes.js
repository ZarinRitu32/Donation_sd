const express = require("express");
const {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routes
// Add Inventory || Post
router.post("/create-inventory", authMiddleware, createInventoryController);

// get inventory || get
router.get("/get-inventory", authMiddleware, getInventoryController);

// get recent inventory || get
router.get(
  "/get-recent-inventory",
  authMiddleware,
  getRecentInventoryController
);

// get inventory Hospital || get
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

// get donars || get
router.get("/get-donors", authMiddleware, getDonorsController);

// get hospitals records || get
router.get("/get-hospitals", authMiddleware, getHospitalsController);

// get organisation records || get
router.get("/get-organisation", authMiddleware, getOrganisationController);

// get organisation records || get
router.get(
  "/get-organisation-for-hospital",
  authMiddleware,
  getOrganisationForHospitalController
);

module.exports = router;
