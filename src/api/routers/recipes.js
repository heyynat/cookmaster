const express = require('express');
const authAdmin = require('../auth/authAdmin');
const validateJWT = require('../auth/validateJWT');
const Recipes = require('../controllers/recipes');

const router = express.Router({ mergeParams: true });

router.post('/recipes', validateJWT, Recipes.create);
router.get('/recipes', Recipes.getAll);
router.get('/recipes/:id', Recipes.getById);
router.put('/recipes/:id', authAdmin, Recipes.update);
router.delete('/recipes/:id', authAdmin, Recipes.exclude);

module.exports = router;
