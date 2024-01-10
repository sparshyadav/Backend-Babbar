const mongoose=require("mongoose");

const postSchema=new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 50
        },
        body: {
            type: String,
            required: true,
            maxLength: 2500
        }
    }
)

module.exports=mongoose.model("Post", postSchema);