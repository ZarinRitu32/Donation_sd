const express = require("express");
const authMiddelware = require("../middlewares/authMiddleware");
const {
  bloodGroupDetailController,
} = require("../controllers/analyticsController");

const router = express.Router();

// routes

// Get Blood Records
router.get("/bloodGroup-data", authMiddelware, bloodGroupDetailController);
module.exports = router;
