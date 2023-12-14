const express = require("express");
require("dotenv").config;
const todoRoutes=require("./routes/todo");
const PORT=process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api/v1", todoRoutes);

app.get("/", (req, res)=>{
    res.send(`<h1> This is HOMEPAGE </h1>`);
})

app.listen(PORT, () => console.log("Server Started")); 

const dbConnect=require("./config/database");
dbConnect();