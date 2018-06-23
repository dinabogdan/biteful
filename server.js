'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const database = require('./controllers/DatabaseController.js');
const authenticationController = require('./controllers/AuthenticationController.js');
const locationController = require('./controllers/LocationController.js');
const storeController = require('./controllers/StoreController.js');
const deliveryController = require('./controllers/DeliveryController.js');
const middleware = require('./controllers/Middleware.js');

const utils = require('./scripts/util.js');

const app = express();
app.use(bodyParser.json());
database.createDb();

app.use(middleware.errorHandler);
app.use(middleware.middlewareLogger);
app.use(middleware.checkContentHeaders);
app.use(middleware.checkBody);

app.post('/user/login', authenticationController.login);
app.put('/user/signup', authenticationController.signup);
app.put('/user/signup/complete', authenticationController.completeSignup);

app.get('/users', authenticationController.users);
app.post('/users/byEmail', authenticationController.findUserByEmail);

app.get('/locations', locationController.getLocations);

app.get('/stores', storeController.getAllStores);
app.get('/stores/:storeId', storeController.getStoreById);

app.get('/deliveries', deliveryController.getAllDeliveries);
app.get('/user/deliveries', deliveryController.getDeliveriesByUserIdAndUserType);
app.get('/deliveries/:deliveryId', deliveryController.getDeliveryById);
app.put('/deliveries', deliveryController.addNewDelivery);

app.get('*', (req, res) => {
  res.send('Hello from the other side!');
});

app.listen(9090, () => console.log('I am listening on port 9090'));
