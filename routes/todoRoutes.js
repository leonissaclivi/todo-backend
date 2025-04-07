const express = require('express');
const router = express.Router();
const todos = require('../models/todoModel');

const { getUserTodos, createTodo, updateTodo } = require('../controllers/todoController');

const authMiddleware = require('./middleware');

router.get('/',authMiddleware, getUserTodos);

router.post('/',authMiddleware, createTodo);

router.patch('/:id',authMiddleware, updateTodo);

module.exports = router;