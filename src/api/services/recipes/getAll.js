const Model = require('../../models/recipes');

module.exports = async () => {
  try {
    const recipes = await Model.getAll();
    if (!recipes) return { message: 'recipe not found' };
    return recipes;
  } catch (error) {
    return error;
  }
};