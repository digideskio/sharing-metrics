'use strict';

var request = require('request');
var async = require('async');
var parser = require('./parser');


// Add new endpoints here, then add a parsing function in parser.js.
var THE_API_ENDPOINTS = {
  'facebook': {
    enabled: true,
    url: 'https://api.facebook.com/method/links.getStats?format=json&urls='
  },

  'twitter': {
    enabled: true,
    url: 'http://urls.api.twitter.com/1/urls/count.json?url='
  },

  'pinterest': {
    enabled: false,
    url: 'http://api.pinterest.com/v1/urls/count.json?url='
  },
};


/********************************************************************
* HELPER FUNCTIONS
*********************************************************************/
var requestShareCount = function(url, callback) {
  request.get(url, function(error, res, body) {
    if (error) {
      callback(error);
    } else {
      callback(null, body);
    }
  });
};


/********************************************************************
* MODULE EXPORTS
*********************************************************************/
exports.getProviders = function() {
  return THE_API_ENDPOINTS;
};


exports.enable = function(provider) {
  THE_API_ENDPOINTS[provider].enabled = true;
};


exports.disable = function(provider) {
  THE_API_ENDPOINTS[provider].enabled = false;
};


exports.getCount = function(sharedUrl, callback) {
  // Intialize the tally results.
  var tally = { 'total': 0 };

  async.forEachOf(THE_API_ENDPOINTS, function(endpoint, provider, callback) {

    // Ignore disabled endpoints to reduce the number of requests.
    if (!endpoint.enabled) { return callback(); }

    var url = endpoint.url + sharedUrl;
    requestShareCount(url, function(error, body) {
      // Something went wrong with the request, so set the provider's
      // tally to 0, and ignore the callback(error).
      if (error) {
        tally[provider] = 0;
        callback();
      }

      // Each API provider returns different results, so parse
      // each response body separately.
      else {
        var parseCount = parser(provider);
        var shareCount = parseCount(body);
        tally[provider] = shareCount;
        tally.total += shareCount;
        callback();
      }
    });
  }, function(error) {
    // Called when all async requests are completed.
    if (!error) {
      return callback(null, tally);
    } else {
      return callback(error);
    }
  });
};
