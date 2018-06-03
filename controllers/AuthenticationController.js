'use strict'

var repo = require('./DatabaseController.js');
var util = require('../scripts/util.js');

module.exports.login = function(req, res, next) {
  if(util.isUndefined(req.body.email, req.body.password)) {
    next (util.buildError(400, 'Wrong request body!'));
    return;
  }
}
