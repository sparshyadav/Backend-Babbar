const mongoose = require("mongoose");
require("dotenv");

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(console.log("Database Connection Established"))
        .catch((err) => {
            console.log("Database Connection Failed");
            console.log(error);
        })
}