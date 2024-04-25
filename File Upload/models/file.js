const mongoose = require("mongoose");

exports.fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tage: {
        type: String
    },
    email: {
        type: String
    }
})