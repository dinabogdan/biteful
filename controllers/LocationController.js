'use strict'
var repo = require('./DatabaseController.js');
var util = require('../scripts/util.js');

module.exports.getLocations = function(req, res, next) {
  repo.findLocations()
      .then(function(locations) {
        res.status(200).send(locations);
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal server error'));
        return;
      });
};
