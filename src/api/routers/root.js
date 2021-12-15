const express = require('express');
const Recipes = require('./recipes');
const Users = require('./users');

const root = express.Router({ mergeParams: true });

root.use(Recipes);
root.use(Users);

module.exports = root;