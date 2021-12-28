const Model = require('../../models/recipes');

module.exports = async () => {
  try {
    const recipes = await Model.getAll();
    return recipes;
  } catch (error) {
    return error;
  }
};