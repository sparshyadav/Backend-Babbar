const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {})
        .then(() => console.log("Db Connection is Successfull"))
        .catch((error) => {
            console.log("An Error Occured")
            console.error(error.message);
            process.exit(1);
        });
}

module.exports = dbConnect;