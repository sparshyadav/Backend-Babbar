const bcrypt = require("bcrypt");
const User = require("../model/user");

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

    }
}