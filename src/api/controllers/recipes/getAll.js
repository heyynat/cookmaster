const { StatusCodes } = require('http-status-codes');
const Services = require('../../services/recipes');

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;

    const recipes = await Services.getAll();
    if (!token || token) {
      return res.status(StatusCodes.OK).json(recipes);
    }
    if (!recipes) {
      return res.status(StatusCodes.NOT_FOUND).json(recipes);
    }
  } catch (err) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
