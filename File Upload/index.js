const express = require("express");
const { cloudinaryConnect } = require("./config/cloudinary");
const connectDatabase = require("./config/databse");
const fileRoutes = require("./routes/fileUpload");
const fileUpload = require("express-fileupload");
require("dotenv").config();


const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(fileUpload);

app.use("/upload", fileRoutes);

cloudinaryConnect();
connectDatabase();
app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
})