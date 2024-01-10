const express=require("express");
const blogRoutes=require("./routes/blog");
require("dotenv").config;
const PORT=process.env.PORT || 3000;

const app=express();
