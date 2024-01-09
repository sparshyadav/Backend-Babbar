const Todo = require("../models/todo");

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        await Todo.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Entry Deleted Successfully"
        })
    }
    catch (err) {
        console.error(err);
        res.send(500).json({
            success: false,
            error: err,
            message: "Error in Deleting Data"
        })
    }
}