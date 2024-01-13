const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        // Get User Data
        const { name, email, password, role } = req.body;

        // Check if User Already Exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        // Creating a Secure Password 
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in Hashing Password"
            })
        }

        //Creating a New User
        const user = await User.create({
            name, email, password: hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User Cannot be Registered, Please Try Again Later"
        });
    }
}

exports.login = async (req, res) => {
    try {
        // Data Fetch
        const { email, password } = req.body;

        // Validation of email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All the Details Carefully"
            });
        }

        // Checking if the user is saved in the Database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is Not Registered"
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        // Verify Password and Generate a JWT Token
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in Successfully"
            });
        }
        else {
            console.log(error);
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure"
        });
    }
}