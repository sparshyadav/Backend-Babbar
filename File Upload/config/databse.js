const mongoose = require("mongoose");
require("dotenv").config;

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(console.log("Database Connection Established"))
        .catch((err) => {
            console.log("Database Connection Failed");
            console.log(error);
        })
}

module.exports = connectDatabase;