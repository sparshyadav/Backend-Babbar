const bcrypt = require("bcrypt");
const User=require("../models/user");

exports.signupController = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const checkIfExists = await User.findOne({email});
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