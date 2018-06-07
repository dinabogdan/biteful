'use strict'

var repo = require('./DatabaseController.js');
var util = require('../scripts/util.js');

module.exports.getAllDeliveries = function(req, res, next) {
  repo.findDeliveries()
      .then(function (deliveries) {
        res.status(200).send(deliveries);
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal Server Error'));
        return;
      });
};
