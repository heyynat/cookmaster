const Model = require('../../models/recipes');

module.exports = async (id) => {
  try {
    const recipeExcluded = await Model.exclude(id);
    return recipeExcluded;
  } catch (error) {
    return error;
  }
};
