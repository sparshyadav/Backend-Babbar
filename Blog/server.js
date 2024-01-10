const express = require("express");
const blogRoutes = require("./routes/blog");
const dbConnect = require("./config/database");
require("dotenv").config;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api")

app.get("/", (req, res) => {
    res.send(`<h1>This is HomePage</h1>`);
})

app.listen(PORT, () => console.log("Server Started"));

dbConnect();