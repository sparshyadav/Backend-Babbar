const { default: mongoose } = require("mongoose");

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Databse Conection Established");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: "An Error Occurred While Establishing Connection with Database"
        })
    }
}