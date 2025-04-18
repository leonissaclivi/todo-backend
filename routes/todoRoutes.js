const express = require('express');
const router = express.Router();
const todos = require('../models/todoModel');

const { getUserTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

const authMiddleware = require('./middleware');

router.get('/',authMiddleware, getUserTodos);

router.post('/',authMiddleware, createTodo);

router.patch('/:id',authMiddleware, updateTodo);

router.delete('/:id',authMiddleware, deleteTodo);

module.exports = router;