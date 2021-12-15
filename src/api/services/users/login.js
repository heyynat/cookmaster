const Model = require('../../models/user');

module.exports = async (email, password) => {
  try {
    const user = await Model.findEmailOfUser(email);
    
    if (!user || user.password !== password) {
      return { STATUSCODE: 'UNAUTHORIZED', message: 'Incorrect username or password' };
    }

    return user;
  } catch (error) {
    return error;
  }
};