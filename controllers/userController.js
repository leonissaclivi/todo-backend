const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const userCreate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            email, password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.secret_key);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 86400000,
        });

        res.json({ message: 'User succesfully registered.' })


    } catch (error) {
        next(error)
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid login credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.secret_key);
        console.log('Generated token:', token); 
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 86400000,
        });
        res.json({ 
            message: 'Login successful',
            token
          });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
      }
}

module.exports = { userCreate, userLogin }