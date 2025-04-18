const Todo = require('../models/todoModel');

const getUserTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const createTodo = async (req, res) => {
    try {
        if (!req.body.task || typeof req.body.task !== 'string') {
            return res.status(400).json({ message: 'Valid task text is required' });
        }
        const { task, completed } = req.body;
        const todo = new Todo({ task, completed, userId: req.userId })
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { completed: req.body.completed },
            { new: true }
        )
        res.json(todo)
    } catch (error) {
        console.error('Todo creation error:', error);

    
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.errors
            });
        }

        res.status(500).json({
            message: 'Failed to create todo',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!todo) {
            return res.status(404).json({
                message: 'Todo not found or you are not authorized to delete it'
            });
        }

        res.json({ 
            message: 'Todo deleted successfully',
            deletedTodo: todo 
        });

    } catch (error) {
        console.error('Todo deletion error:', error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid todo ID format'
            });
        }

        res.status(500).json({
            message: 'Failed to delete todo',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

module.exports = { getUserTodos, createTodo, updateTodo, deleteTodo }