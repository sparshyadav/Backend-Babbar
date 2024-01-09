const Todo=require("../models/todo");

exports.createTodo=async(req, res)=>{
    const{title, description}=req.body;
    console.log(title, description);
    try{
        const response=await Todo.create({title, description});
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry Created Successfully" 
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal Error Occured",
            message: err.message
        })
    }
}