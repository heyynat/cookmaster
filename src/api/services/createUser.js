const Joi = require('joi');
const Model = require('../models/user');

module.exports = async (newUser) => {
  const emailExist = await Model.findEmailOfUser(newUser.email);
  if (emailExist) {
    return { STATUSCODE: 'CONFLICT', message: 'Email already registered' };
  }
  try {
    const { error } = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate(newUser);
    const { name, email, password } = newUser;
    const userCreated = await Model.create(name, email, password);
    if (error) return { STATUSCODE: 'BAD_REQUEST', message: 'Invalid entries. Try again.' };
    return userCreated;
  } catch (error) {
    return error;
  }
};