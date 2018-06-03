'use strict'

var repo = require('./DatabaseController.js');
var util = require('../scripts/util.js');

module.exports.login = function(req, res, next) {
   if(util.isUndefined(req.body.email, req.body.password)) {
     next (util.buildError(400, 'Wrong request body!'));
     return;
   }

  var user = req.body;
  console.log(user);

  repo.findUserByEmail(user.email)
    .then(function(userFound) {
      if(userFound === null) {
        res.status(404).send(util.buildError(401, 'Wrong email address!'));
        return;
      }

      if(user.password !== userFound.password) {
        res.status(404).send(util.buildError(401, 'Wrong password!'));
        return;
      }

      if(userFound !==null && user.password === userFound.password) {
        res.status(200).send(util.buildOkResponse({'message': 'Successfull login!'}));
      }
    })
    .catch(function(err) {
      next(util.buildErrorResponse(500, 'Internal server error'));
    });

    return;
}
