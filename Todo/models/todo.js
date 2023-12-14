const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLenght: 50
        },
        description: {
            type: String,
            required: true,
            maxLenght: 100
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
)