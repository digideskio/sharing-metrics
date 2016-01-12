'use strict';

var assert = require('chai').assert;
var shares = require('../src/shares');

describe('shares', function() {

  var providers = shares.THE_API_ENDPOINTS;

  describe('.isObject()', function() {
    it('should expose the API providers for public use', function() {
      assert.isObject(providers);
    });

    it('should contain the facebook share provider', function() {
      assert.property(providers, 'facebook');
    });

    it('should contain the pinterest share provider', function() {
      assert.property(providers, 'pinterest');
    });
  });

  describe('.enable()', function() {
    it('should enable the given provider', function() {
      shares.enable('pinterest');
      assert.isTrue(providers.pinterest.enabled);
    });
  });

  describe('.disable()', function() {
    it('should disbale the given provider', function() {
      shares.disable('facebook');
      assert.isFalse(providers.facebook.enabled);
    });
  });

});
