const Todo = require("../models/todo");

exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({
            success: true,
            data: todos,
            message: "Entire Todo Data is Fetched"
        })
    }
    catch (err) {
        console.error(err);
        res.send(500).json({
            success: false,
            error: err,
            message: "Error in Fetching Data"
        })
    }
}

exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById({ _id: id });

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "No Data found with the Given ID"
            })
        }
        else {
            return res.status(200).json({
                success: true,
                data: todo,
                message: "Given Todo Found"
            })
        }
    }
    catch (err) {
        console.error(err);
        res.send(500).json({
            success: false,
            error: err,
            message: "Error in Fetching Data"
        })
    }
}