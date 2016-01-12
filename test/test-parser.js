'use strict';

var assert = require('chai').assert;
var parser = require('../src/parser');

describe('parser', function() {

  it('should correctly parse the facebook count', function() {
    var facebookParser = parser('facebook');
    var mockedResponseBody = '[{"url":"http:\/\/newsela.com","normalized_url":"http:\/\/www.newsela.com\/","share_count":1498,"like_count":1268,"comment_count":932,"total_count":3698,"click_count":0,"comments_fbid":"1385084535036639","commentsbox_count":0}]';
    assert.strictEqual(facebookParser(mockedResponseBody), 1498);
  });

  it('should correctly parse the pinterest count', function() {
    var pinterestParser = parser('pinterest');
    var mockedResponseBody = 'receiveCount({"url":"https://newsela.com/articles/turtle-navigation/id/7010/","count":9000})';
    assert.strictEqual(pinterestParser(mockedResponseBody), 9000);
  });

});
