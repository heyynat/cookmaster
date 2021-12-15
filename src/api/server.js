const app = require('./app');
const authAdmin = require('./auth/authAdmin');
const validateJWT = require('./auth/validateJWT');
const createUsers = require('./controllers/createUser');
const login = require('./controllers/login');
const createRecipe = require('./controllers/recipes/createRecipe');
const exclude = require('./controllers/recipes/exclude');
const getAll = require('./controllers/recipes/getAll');
const getById = require('./controllers/recipes/getById');
const updateRecipe = require('./controllers/recipes/updateRecipe');

const PORT = 3000;

app.post('/users', createUsers);
app.post('/login', login);
app.post('/recipes', validateJWT, createRecipe);
app.get('/recipes', getAll);
app.get('/recipes/:id', getById);
app.put('/recipes/:id', authAdmin, updateRecipe);
app.delete('/recipes/:id', authAdmin, exclude);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
