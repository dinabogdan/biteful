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

module.exports.findAllDeliveriesWithoutCourier = function(req, res, next) {
  repo.findAllDeliveriesWithoutCourier()
      .then(function(deliveries) {
        res.send(deliveries);
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

  if(util.isUndefined(delivery.details)) {
    next(util.buildErrorResponse(400, 'The details of the delivery are mandatory'));
    return;
  }

  if(util.isUndefined(delivery.addressId)) {
    next(util.buildErrorResponse(400, 'The addressId of the delivery is mandatory'));
    return;
  }

  if(util.isUndefined(delivery.customerId)) {
    next(util.buildErrorResponse(400, 'The customerId of the delivery is mandatory'));
    return;
  }

  if(util.isUndefined(delivery.storeId)) {
    next(util.buildErrorResponse(400, 'The storeId of the delivery is mandatory'));
    return;
  }

  repo.createDelivery(delivery)
      .then(function(delivery) {
        res.status(200).send(util.buildOkResponse(delivery));
      })
      .catch(function(err) {
        next(util.buildErrorResponse(500, 'Internal Server Error'));
      });
      return;
};
