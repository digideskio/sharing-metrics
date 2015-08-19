'use strict';

var assert = require('chai').assert;
var shares = require('../src/shares');

describe('shares', function() {

  describe('.isObject()', function() {
    var providers = shares.getProviders();

    it('should expose the API providers for public use', function() {
      assert.isObject(providers);
    });

    it('should contain the facebook share provider', function() {
      assert.property(providers, 'facebook');
    });

    it('should contain the twitter share provider', function() {
      assert.property(providers, 'twitter');
    });

    it('should contain the pinterest share provider', function() {
      assert.property(providers, 'pinterest');
    });
  });


  describe('.enable()', function() {
    var providers = shares.getProviders();

    it('should enable the given provider', function() {
      shares.enable('pinterest');
      assert.isTrue(providers.pinterest.enabled);
    });
  });


  describe('.disable()', function() {
    var providers = shares.getProviders();

    it('should disbale the given provider', function() {
      shares.disable('facebook');
      assert.isFalse(providers.facebook.enabled);
    });
  });

});
