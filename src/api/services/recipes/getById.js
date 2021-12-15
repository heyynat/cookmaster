const Model = require('../../models/recipes');

module.exports = async (id) => {
  try {
    const recipeFound = await Model.getById(id);
    if (!recipeFound) return { message: 'recipe not found' };
    return recipeFound;
  } catch (error) {
    return error;
  }
};