const { default: mongoose } = require("mongoose");
require("dotenv").config();

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Databse Conection Established");
    }
    catch (err) {
        console.log("An Error Occurred While Establishing Connection with Database");
        console.log(err);
    }
}