const express = require("express");
const { localFileUpload } = require("../controllers/fileUpload");
const router = express.Router();

app.post("/localupload", localFileUpload);

module.exports = router;