const express = require("express");
const {
  getDonorList,
  getHospitalList,
  getOrganisationList,
  deleteUser,
} = require("../controllers/adminController");

const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
console.log("Admin Routes Loaded");

// Admin routes
router.get("/donor-list", authMiddleware, adminMiddleware, getDonorList);
router.get("/hospital-list", authMiddleware, adminMiddleware, getHospitalList);
router.get(
  "/organisation-list",
  authMiddleware,
  adminMiddleware,
  getOrganisationList
);

// =================== Delete ==================================================
// delete donar
router.delete("/delete-user/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
