const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: true,
                message: "Token Missing"
            })
        }

        try {
            const decode = jwt.verify(token, provess.env.JWT_SECRET);
            req.user = decode;
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid"
            })
        }

        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something went Wrong while Verifying the Token"
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Students"
            })
        }

        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is Not Matching with Student"
        })
    }
}


exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin"
            })
        }

        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is Not Matching with Admin"
        })
    }
}