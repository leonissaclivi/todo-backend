const Todo = require('../models/todoModel');

const getUserTodos = async (req,res)=>{
    try {
        const todos = await Todo.find({user: req.userId});
        res.json(todos);
    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
}

const createTodo = async (req,res) => {
    try {
        if (!req.body.task || typeof req.body.task !== 'string') {
            return res.status(400).json({ message: 'Valid task text is required' });
          }
        const {task, completed} = req.body;
        const todo = new Todo({task, completed, userId: req.userId})
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
};

const updateTodo = async (req,res) => {
    try {
        const todo = Todo.findOneAndUpdate(
            {_id: req.params.id, user:req.userId},
            {completed: req.body.completed},
            {new:true}
        )
        res.json(todo)
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
}

module.exports = {getUserTodos, createTodo, updateTodo}