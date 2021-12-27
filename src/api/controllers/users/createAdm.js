const { StatusCodes } = require('http-status-codes');
const Services = require('../../services/users');

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Services.createAdm({ name, email, password });
    const infoUser = req.user;

    if (user.message) {
      return res.status(StatusCodes[user.STATUSCODE]).json(user);
    }

    if (infoUser.role !== 'admin') {
      return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: 'Only admins can register new admins' });
    }
      return res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
