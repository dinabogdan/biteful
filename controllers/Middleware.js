'use strict'
var util = require('../scripts/util.js');

module.exports.errorHandler = function (err, req, res, next) {
  res.status(err.statusCode).send(err);
  next();
};

module.exports.middlewareLogger = function(req, res, next) {
  console.log(new Date() + ' - method: ' + req.method + ' - URL: ' + req.url);
  next();
};

module.exports.checkContentHeaders = function (req, res, next) {
  var contentHeader = req.get('Content-Type');
  if((req.method === 'POST' || req.method === 'PUT') && (util.isUndefined(contentHeader) || contentHeader!== 'application/json')) {
    res.status(415).send(util.buildErrorResponse(415, 'Unsupported Media Type'));
    return;
  }
  next();
};

module.exports.checkBody = function(req, res, next) {
  if(req.method === 'POST' || req.method === 'PUT') {
    if(util.isUndefined(req.body)) {
      res.status(400).send(util.buildErrorResponse(400, 'The request body must not be empty!'));
    }
  }
  next();
};
