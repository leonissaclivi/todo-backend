const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error();
    
    const decoded = jwt.verify(token, process.env.secret_key);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;