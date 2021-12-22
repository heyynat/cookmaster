const connection = require('./connection');

const create = async (name, email, password) => {
  const role = { role: 'user' };
  const { insertedId: _id } = await (await connection())
  .collection('users').insertOne({ name, email, password, ...role });
  return { user: { _id, name, email, ...role } };
};

const createAdm = async (name, email, password) => {
  const role = { role: 'admin' };
  const { insertedId: _id } = await (await connection())
  .collection('users').insertOne({ name, email, password, ...role });
  return { user: { _id, name, email, ...role } };
};

const findEmailOfUser = async (email) => {
  const db = await connection();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

const findUser = async (name) => {
  const db = await connection();
  const userData = await db.collection('users').findOne({ name });
  return userData;
};

module.exports = { create, createAdm, findEmailOfUser, findUser };
