'use strict'
var repo = require('./DatabaseController.js');
var util = require('../scripts/util.js');

const passwordPattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

module.exports.login = function(req, res, next) {
   if(util.isUndefined(req.body.email, req.body.password)) {
     next (util.buildError(400, 'Wrong request body!'));
     return;
   }
  var user = req.body;
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
};

module.exports.signup = function(req, res, next) {
  console.log("A intrat in functie");
  if(util.isUndefined(req.body.email, req.body.password, req.body.type)) {
    next(util.buildErrorResponse(400, 'Wrong request body!'));
    return;
  }
  console.log(req.body);
  var newUser = req.body;

  if(!util.validatePassword(passwordPattern, newUser.password)) {
    next(util.buildErrorResponse(404, 'Wrong password!'));
    return;
  }
  console.log(newUser);


  repo.findUserByEmail(newUser.email)
      .then(function (user) {
        if(user !== null) {
          next(util.buildErrorResponse(400, 'A user with the specified email already exists!'));
          return;
        }

        repo.createUser(newUser)
            .then(function (user) {
              res.status(200).send(util.buildOkResponse({'message': 'User was successfully created'}));
          })
      })
      .catch(function (err) {
        next(util.buildErrorResponse(500, 'Internal server error'));
      });
      return;
};