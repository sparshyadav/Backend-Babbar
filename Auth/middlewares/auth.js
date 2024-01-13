const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // Extract JWT Token
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }

        // Verify the Token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid"
            })
        }

        next();
    }
    catch (error) {
        return res.statusj(401).json({
            success: false,
            message: "Something went wrong, while verifying the token"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students"
            });
        }

        next();
    }
    catch (error) {
        return res.statusj(401).json({
            success: false,
            message: "User Role is Not Matching"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin"
            });
        }

        next();
    }
    catch (error) {
        return res.statusj(401).json({
            success: false,
            message: "User Role is Not Matching"
        })
    }
}