'use strict';

var parseFacebookShares = function(body) {
  return JSON.parse(body)[0].share_count;
};

var parsePinterestShares = function(body) {
  return JSON.parse(body.slice(13, -1)).count;
};

var RESPONSE_PARSERS = {
  'facebook': parseFacebookShares,
  'pinterest': parsePinterestShares
};

module.exports = function(provider) {
    return RESPONSE_PARSERS[provider];
};
