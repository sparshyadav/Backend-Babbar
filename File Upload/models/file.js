const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
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

fileSchema.post("save", async function (doc) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auto: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from: "Sparsh Yadav",
            to: doc.email,
            subject: "This is a Sample Mail from Nodemailer",
            html: `<h2> Hi, Hey, Hello </h2>`
        })

        console.log(info);
    }
    catch (err) {

    }
})

module.exports = mongoose.model("File", fileSchema);