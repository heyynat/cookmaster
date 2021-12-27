const express = require('express');
const authAdmin = require('./auth/authAdmin');
const validateJWT = require('./auth/validateJWT');
const Recipes = require('./controllers/recipes');
const Users = require('./controllers/users');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', Users.create);
app.post('/users/admin', authAdmin, Users.createAdm);
app.post('/login', Users.login);

app.post('/recipes', validateJWT, Recipes.create);
app.get('/recipes', Recipes.getAll);
app.get('/recipes/:id', Recipes.getById);
app.put('/recipes/:id', authAdmin, Recipes.update);
app.delete('/recipes/:id', authAdmin, Recipes.exclude);
app.put('/recipes/:id/image/', authAdmin, Recipes.image);

module.exports = app;
