const express = require('express');
const router = express.Router();

const Users = require('../models/userModel');
const { userCreate, userLogin } = require('../controllers/userController');

router.post('/signup', userCreate)

router.post('/login', userLogin)



module.exports = router;    