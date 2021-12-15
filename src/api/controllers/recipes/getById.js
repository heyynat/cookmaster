const { StatusCodes } = require('http-status-codes');
const getById = require('../../services/recipes/getById');

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    const recipe = await getById(id);
    if (recipe.message) {
      return res.status(StatusCodes.NOT_FOUND).json(recipe);
    }
    if (!token || token) {
      return res.status(StatusCodes.OK).json(recipe);
    }
  } catch (err) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
