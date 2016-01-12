'use strict';

var http = require('http');
var async = require('async');
var parser = require('./parser');


// Add new endpoints here, then add a parsing function in parser.js.
var THE_API_ENDPOINTS = {
  'facebook': {
    enabled: true,
    url: 'http://api.facebook.com/method/links.getStats?format=json&urls='
  },

  'pinterest': {
    enabled: false,
    url: 'http://api.pinterest.com/v1/urls/count.json?url='
  },
};


/********************************************************************
* MODULE EXPORTS
*********************************************************************/
exports.THE_API_ENDPOINTS = THE_API_ENDPOINTS;

exports._request = function(url, callback) {
  http.get(url, function(res) {
    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      return callback(null, data, res);
    });

    res.on('error', function(error) {
      return callback(error);
    });
  });
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
    exports._request(url, function(error, body) {
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
