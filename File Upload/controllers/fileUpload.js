exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;

        let path = __dirname + "/files/" + Date.now();

        file.mv(path, (err) => {
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