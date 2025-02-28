const express = require("express");
const authMiddelware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//add inventory
router.post("/create-inventory", authMiddelware, createInventoryController);

// get inventory || get
router.get("/get-inventory", authMiddelware, getInventoryController);

module.exports = router;
