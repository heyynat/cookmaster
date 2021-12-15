const { StatusCodes } = require('http-status-codes');
const Services = require('../../services/recipes');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipeUpdate = { name, ingredients, preparation };
    const recipeUpdated = await Services.update(id, recipeUpdate);
    return res.status(StatusCodes.OK).json(recipeUpdated);
  } catch (err) {
    res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
