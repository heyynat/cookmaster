const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Model = require('../../models/user');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Model.findEmailOfUser(email);

    if (!email || !password) {
      return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'All fields must be filled' }); 
    }

    if (!user || user.password !== password) {
      return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Incorrect username or password' });
    }

    const token = jwt.sign({ data: user }, secret, jwtConfig);
    
    return res.status(StatusCodes.OK).json({ token });
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro interno', error: e });
  }
};
