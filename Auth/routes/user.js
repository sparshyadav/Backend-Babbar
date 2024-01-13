const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// Protected Routes
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected Route for Tests"
    })
})

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected Route for Students"
    });
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected Route for Admin"
    })
})

module.exports = router;