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

        const token = jwt.sign({ data: email }, process.env.secret_key);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.json({ message: 'User succesfully registered.' })


    } catch (error) {
        next(error)
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const doesUserExist = await User.findOne({ email });
        if (!doesUserExist) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = bcrypt.compareSync(password, doesUserExist.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid login credentials' });
        }
        const token = jwt.sign({ data: email }, process.env.secret_key);
        res.cookie('token', token)
        res.json({ message: 'User login successfull' })
    } catch (error) {
        next(error);
    }
}

module.exports = { userCreate, userLogin }