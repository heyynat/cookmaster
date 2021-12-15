const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Model = require('../models/user');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  
  try {
    const decoded = jwt.verify(token, segredo);
    
    const user = await Model.findUser(decoded.data.name);
    
    if (!user) {
      return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'jwt malformed' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
  }
};
