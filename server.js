const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.post("api/cars", (req, res) => {
    const { name, brand } = request.body;
    console.log(name);
    console.log(brand);
    res.send("Car Submitted Successfully");
});

app.listen(3000, () => console.log("Server Started")); 