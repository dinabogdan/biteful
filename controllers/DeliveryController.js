'use strict'

var repo = require('./DatabaseController.js');
var util = require('../scripts/util.js');

module.exports.getAllDeliveries = function(req, res, next) {
  console.log('A intrat aici')
  repo.findDeliveries()
      .then(function (deliveries) {
         res.status(200).send(deliveries);
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal Server Error'));
        return;
      });
};

module.exports.getDeliveryById = function(req, res, next) {
 var deliveryId = req.params.deliveryId;
 if(util.isUndefined(deliveryId)){
   next(util.buildErrorResponse(400, 'DeliveryId is incorrect'));
   return;
 }

 repo.findDeliveryById(deliveryId)
     .then(function(delivery){
       if(delivery === null || util.isUndefined(delivery)){
         res.status(404).send(util.buildErrorResponse(404, 'The delivery with the specified id was not found!'));
         return;
       }
       res.status(200).send(delivery);
     })
     .catch(function(err) {
       next(util.buildErrorResponse(500, 'Internal Server Error'));
       return;
     });
     return;
};

module.exports.getDeliveriesByUserIdAndUserType = function(req, res, next) {
  var userId = req.query.userId;
  var userType = req.query.userType;

  if(util.isUndefined(userId)) {
    next(util.buildErrorResponse(400, 'UserId is incorrect'));
    return;
  }

  if(util.isUndefined(userType)) {
    next(util.buildErrorResponse(400, 'UserType is incorrect'));
    return;
  }

  repo.findDeliveriesByUserIdAndType(userId, userType)
      .then(function(deliveries) {
        console.log('A intrat aici');
        if(deliveries === null || util.isUndefined(deliveries)) {
          res.status(404).send(util.buildErrorResponse(404, 'No deliveries found for the specified parameters!'));
          return;
        }
        res.status(200).send(deliveries);
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal Server Error'));
        return;
      });
      return;
};

module.exports.addNewDelivery = function(req, res, next) {
  if(util.isUndefined(req.body)) {
    next(util.buildErrorResponse(400, 'The payload of the JSON is incorrect'));
    return;
  }
  var delivery = req.body;
  repo.createDelivery(delivery)
      .then(function(delivery) {
        res.status(200).send(util.buildOkResponse(delivery));
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal Server Error'));
      });
      return;
};
