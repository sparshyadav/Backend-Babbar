const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key: API_KEY,
            api_secret: API_SECRET
        })
    }
    catch (err) {
        console.log("An Error Occurred While Connecting with Cloudinary");
        console.log(err);
    }
}