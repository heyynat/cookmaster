const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (newRecipe) => {
  const { insertedId: _id } = await (await connection())
  .collection('recipes').insertOne({ ...newRecipe });
  return { recipe: { _id, ...newRecipe } };
};

const getAll = async () => {
  const recipes = await (await connection()).collection('recipes').find().toArray();
  if (!recipes) return null;
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const recipe = await (await connection()).collection('recipes').findOne({ _id: ObjectId(id) });
  if (!recipe) return null;
  return recipe;
};

const update = async (id, recipeUpdate) => {
  (await connection()).collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { ...recipeUpdate } });
  const recipeUpdated = await getById(id);
  return recipeUpdated;
};

const exclude = async (id) => {
  if (ObjectId.isValid(id)) {
    return (await connection()).collection('recipes').deleteOne({ _id: ObjectId(id) });
  }
  return null;
};

module.exports = { create, getAll, getById, update, exclude };
