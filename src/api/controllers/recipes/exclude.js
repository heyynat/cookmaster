const { StatusCodes } = require('http-status-codes');
const Services = require('../../services/recipes');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeExcluded = await Services.exclude(id);
    return res.status(StatusCodes.NO_CONTENT).json(recipeExcluded);
  } catch (err) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
