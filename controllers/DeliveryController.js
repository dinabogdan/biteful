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

module.exports.getDeliveryById = function(req, res, next) {
 var deliveryId = req.params.deliveryId;
 if(util.isUndefined(deliveryId)){
   next(util.buildErrorResponse(400, 'DeliveryId is incorrect'));
   return;
 }

 repo.findDeliveryById(deliveryId)
     .then(function(delivery){
       console.log("A intrat aici");
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
