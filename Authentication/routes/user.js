const express = require("express");
const { signupController } = require("../controllers/auth");
const router = express.Router();

// router.post("/login", loginController);
router.post("/signup", signupController);

module.exports = router;