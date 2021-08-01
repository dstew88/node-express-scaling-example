const express = require('express');
const path = require('path');

const app = express();
const apiRouter = require('./api/routes');

const { ALIAS, HOSTNAME, SERVER_PORT } = process.env;

app.use('/', express.static(path.resolve(__dirname, './public')));
app.use('/api', apiRouter);
app.use((req, res, next) => {
  console.log(`Hit instance ${HOSTNAME}`);
});

app.listen(SERVER_PORT, () => {
  console.log('Listening on port', SERVER_PORT);
});
