const Joi = require('joi');
const Model = require('../../models/user');

module.exports = async (newUser) => {
  try {
    const { error } = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate(newUser);
    const { name, email, password } = newUser;
    const adminCreated = await Model.createAdm(name, email, password);
    if (error) return { STATUSCODE: 'BAD_REQUEST', message: 'Invalid entries. Try again.' };
    return adminCreated;
  } catch (error) {
    return error;
  }
};