const express = require("express");
const { localFileUpload, imageUpload, videoUpload } = require("../controllers/fileUpload");
const router = express.Router();

router.post("/localupload", localFileUpload);
router.post("/image", imageUpload);
router.post("/video", videoUpload);

module.exports = router;