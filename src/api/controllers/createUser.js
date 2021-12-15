const { StatusCodes } = require('http-status-codes');
const createUser = require('../services/createUser');

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };
    const user = await createUser(newUser);
    const { STATUSCODE } = user;

    if (user.message) {
      return res.status(StatusCodes[STATUSCODE]).json({ message: user.message });
    }
      return res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
