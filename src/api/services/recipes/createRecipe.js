const Joi = require('joi');
const Model = require('../../models/recipes');

module.exports = async (newRecipe) => {
  try {
    const { error } = Joi.object({
      name: Joi.string().required(),
      ingredients: Joi.string().required(),
      preparation: Joi.string().required(),
    }).validate(newRecipe);
    if (error.details[0].message.includes('is required')) {
      return { STATUSCODE: 'BAD_REQUEST', message: 'Invalid entries. Try again.' };
    }
    const recipeCreated = await Model.create(newRecipe);
    return recipeCreated;
  } catch (error) {
    return error;
  }
};
