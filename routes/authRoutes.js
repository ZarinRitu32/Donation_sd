const express = require("express");
const { registerController,loginController, currentUserController, } = require("../controllers/authController");
const authMiddelware = require("../middlewares/authMiddelware");


const router = express.Router()

//routes
router.post('/register',registerController)

// login route
router.post("/login", loginController);

//get current user
router.get('/current-user',authMiddelware,currentUserController)

module.exports = router;
