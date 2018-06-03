'use strict'

module.exports.isUndefined = function() {
  if(arguments === undefined) {
    return true;
  }
  for(var key in arguments) {
    var argument = arguments[key];
    if(argument === undefined) {
      return true;
    }
  }
  return false;
};

module.exports.buildErrorResponse = function(httpStatusCode, errorMessage) {
  return {
    'statusCode': httpStatusCode, 'errorMessage': errorMessage
  }
};
