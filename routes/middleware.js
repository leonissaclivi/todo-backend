const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('Received token:', token);
    if (!token) {
      console.log('No token found');
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.secret_key);
    console.log('Decoded token:', decoded);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;