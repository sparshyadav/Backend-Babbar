const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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