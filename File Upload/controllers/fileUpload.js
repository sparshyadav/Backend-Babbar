const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;

        let filePath = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(filePath, (err) => {
            console.log("An Error Occurred While Moving File");
            console.log(err);
        })

        res.json({
            success: true,
            message: "Local File Uploaded Successfully"
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "An Error Occurred While Saving File"
        })
    }
}

function isFileTypeSupported(type, supporedTypes) {
    return supporedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    options.resource_type = "auto";
    options.quality = quality;
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        const file = req.files.imageFile;

        const supporedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supporedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format not Supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "File_Upload", 60);
        console.log("This is Response - ", response);
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            message: "Image Uploaded Successfully",
            data: fileData
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "An Error Occurred While Saving File"
        })
    }
}

exports.videoUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        const file = req.files.videoFile;

        const supportedTypes = ["mp4", "mov", "MP4", "MPEG-4"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        console.log("Is File Type Matching - ", isFileTypeSupported(fileType, supportedTypes));
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format not Supported"
            })
        }
        const response = await uploadFileToCloudinary(file, "File_Upload", 60);

        const fileData = await File.create({
            name, email, tags, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            message: "Video Uploaded Successfully",
            data: fileData
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "An Error Occurred While Saving File"
        })
    }
}