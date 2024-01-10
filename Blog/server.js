const express = require("express");
const blogRoutes = require("./routes/blog");
const dbConnect = require("./config/database");
require("dotenv").config();
const PORT = process.env.PORT || 3334;

const app = express();

app.use(express.json());

// app.use("/api/v1", blogRoutes);

app.get("/", (req, res) => {
    res.send(`<h1>This is HomePage</h1>`);
})

dbConnect();

app.listen(PORT, () => console.log("Server Started"));
