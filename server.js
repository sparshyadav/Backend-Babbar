const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongobd://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((bodyParser.json()));

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.post("api/cars", (req, res) => {
    const { name, brand } = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car Submitted Successfully");
});

app.listen(3000, () => console.log("Server Started")); 