const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signupController = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const checkIfExists = await User.findOne({ email });
        if (checkIfExists) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in Hashing Password"
            })
        }

        const user = await User.create({
            username, email, password: hashedPassword, role
        })

        res.status(200).json({
            success: true,
            data: user,
            message: "User Created Successfully"
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "User Cannot be Registered, Please Try Again"
        })
    }
}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Please Fill All Details Carefully"
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is Not Registered"
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token, user, 
                message: "User Logged In Successfully"
            })
        }
        else {
            return res.status(402).json({
                success: false,
                message: "Password Incorrect"
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(
            {
                success: false,
                message: "Error While Loging In a User"
            }
        )
    }
}