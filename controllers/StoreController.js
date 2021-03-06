'use strict'

var repo = require('./DatabaseController.js');
var util = require('../scripts/util.js');

module.exports.getAllStores = function(req, res, next) {
  repo.findStores()
      .then(function(stores) {
        res.status(200).send(stores);
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal Server Error'));
        return;
      })
};

module.exports.getStoreById = function(req, res, next) {
  var storeId = req.params.storeId;
  if(util.isUndefined(storeId)){
    next(util.buildErrorResponse(400, 'UserId is incorrect'));
    return;
  }
  repo.findStoreById(storeId)
      .then(function(store) {
        if(store === null || util.isUndefined(store)) {
          res.status(404).send(util.buildErrorResponse(404, 'The store with the specified id was not found!'));
          return;
        }
        res.status(200).send(store);
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal Server Error'));
        return;
      })
    return;
};
