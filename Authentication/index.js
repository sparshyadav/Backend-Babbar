const express = ("express");
require("dotenv");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
})

