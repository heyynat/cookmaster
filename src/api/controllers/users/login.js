const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Services = require('../../services/users');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Services.login(email, password);

    if (!email || !password) {
      return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'All fields must be filled' }); 
    }

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    if (user.message) {
      return res.status(StatusCodes[user.STATUSCODE]).json({ message: user.message });
    }
      return res.status(StatusCodes.OK).json({ token });
    } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro interno', error: e });
  }
};
