'use strict'
var repo = require('./DatabaseController.js');
var util = require('../scripts/util.js');

const passwordPattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

module.exports.completeSignup = function(req, res, next) {
  if(util.isUndefined(req.body.details)){
    next(util.buildErrorResponse(400, 'Wrong request body!'));
    return;
  }
  var address = req.body;
  repo.addAddress(address)
      .then(function(address){
        res.status(200).send(util.buildOkResponse({"message": "Succes Complete Signup"}));
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal server error'));
      })
      return;
};

module.exports.login = function(req, res, next) {
   if(util.isUndefined(req.body.email, req.body.password)) {
     next (util.buildErrorResponse(400, 'Wrong request body!'));
     return;
   }
  var user = req.body;
  repo.findUserByEmail(user.email)
    .then(function(userFound) {
      if(userFound === null) {
        res.status(401).send(util.buildErrorResponse(401, 'Wrong email address!'));
        return;
      }

      if(user.password !== userFound.password) {
        res.status(401).send(util.buildErrorResponse(401, 'Wrong password!'));
        return;
      }
      if(userFound !==null && user.password === userFound.password) {
        res.send({
                  'id': userFound.id,
                  'usertype': userFound.type,
                  'addressId': userFound.address.id,
                  'addressDetails': userFound.address.details
                });
      }
    })
    .catch(function(err) {
      next(util.buildErrorResponse(500, 'Internal server error'));
    });
    return;
};

module.exports.findUserByEmail = function(req, res, next) {
  if(util.isUndefined(req.body.email, req.body.password)) {
    next (util.buildErrorResponse(400, 'Wrong request body!'));
    return;
  }
  var user = req.body;
  repo.findUserByEmail(user.email)
    .then(function(userFound) {
      if(userFound === null) {
        res.status(401).send(util.buildErrorResponse(401, 'Wrong email address!'));
        return;
      }

      if(user.password !== userFound.password) {
        res.status(401).send(util.buildErrorResponse(401, 'Wrong password!'));
        return;
      }

      if(userFound !==null && user.password === userFound.password) {
        res.status(200).send(userFound);
      }
    })
    .catch(function(err) {
      next(util.buildErrorResponse(500, 'Internal server error'));
    });

    return;
};

module.exports.users = function(req, res, next) {
  repo.findAllUsers()
      .then(function (users) {
        res.status(200).send(users);
      })
      .catch(function (err) {
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
    res.status(401).send(util.buildErrorResponse(401, 'Wrong password!'));
    return;
  }
  console.log(newUser);

  repo.findUserByEmail(newUser.email)
      .then(function (user) {
        if(user !== null) {
          res.status(400).send(util.buildErrorResponse(400, 'A user with the specified email already exists!'));
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
