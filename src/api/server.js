const app = require('./app');
const root = require('./routers/root');

const PORT = 3000;

app.use('/', root);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

module.exports = app;
