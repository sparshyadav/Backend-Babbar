const { connectDatabase } = require("./config/database");
const express = require("express");
const user = require("./routes/user");
require("dotenv");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", user);

connectDatabase();
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
})

