const express=require("express");
const app=express();

const port=3000;

app.listen(port, ()=>{
    console.log("Server has been Started at PORT: 3000");
});