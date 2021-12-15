const Joi = require('joi');
const Model = require('../../models/recipes');

module.exports = async (id, recipeUpdate) => {
  try {
    const { error } = Joi.object({
      name: Joi.string().required(),
      ingredients: Joi.string().required(),
      preparation: Joi.string().required(),
    }).validate(recipeUpdate);
    if (error) {
      return { STATUSCODE: 'BAD_REQUEST', message: 'Invalid entries. Try again.' };
    }
    const recipeUpdated = await Model.update(id, recipeUpdate);
    return recipeUpdated;
  } catch (error) {
    return error;
  }
};
