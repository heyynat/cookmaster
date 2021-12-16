const express = require('express');
const path = require('path');
const app = require('./app');
const viewImage = require('./controllers/recipes/viewImage');
const root = require('./routers/root');

const PORT = 3000;

app.use('/', root);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')), viewImage);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
