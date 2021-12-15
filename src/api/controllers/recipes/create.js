const { StatusCodes } = require('http-status-codes');
const Services = require('../../services/recipes');

module.exports = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { name, ingredients, preparation } = req.body;
    const newRecipe = { name, ingredients, preparation, userId };
    const recipe = await Services.create(newRecipe);
    const { STATUSCODE } = recipe;

    if (recipe.message) {
      return res.status(StatusCodes[STATUSCODE]).json({ message: recipe.message });
    }
      return res.status(StatusCodes.CREATED).json(recipe);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};
