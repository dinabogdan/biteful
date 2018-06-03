'use strict'
var util = require('../scripts/util.js');

module.exports.errorHandler = function (err, req, res, next) {
  res.status(err.statusCode).send(err);
  next();
};
