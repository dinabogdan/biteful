'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const database = require('./controllers/DatabaseController.js');
const authenticationController = require('./controllers/AuthenticationController.js');
const middleware = require('./controllers/Middleware.js');

const utils = require('./scripts/util.js');

const app = express();
app.use(bodyParser.json());
database.createDb();

app.use(middleware.errorHandler);

app.post('/user/login', authenticationController.login);
app.put('/user/signup', authenticationController.signup);

app.get('*', (req, res) => {
  res.send('Hello from the other side!');
});

app.listen(9090, () => console.log('I am listening on port 9090'));