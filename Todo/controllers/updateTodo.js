const Todo = require("../models/todo");

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            { _id: id },
            { title, description, updatedAt: Date.now() }
        )

        res.status(200).json({
            success: true,
            data: todo,
            message: "Entry Updated Successfully"
        })
    }
    catch (err) {
        console.error(err);
        res.send(500).json({
            success: false,
            error: err,
            message: "Error in Updating Data"
        })
    }
}