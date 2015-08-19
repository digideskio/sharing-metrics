'use strict';

var assert = require('chai').assert;
var parser = require('../src/parser');

describe('parser', function() {

  it('should correctly parse the facebook count', function() {
    var facebookParser = parser('facebook');
    var mockedResponseBody = '[{"url":"https:\/\/newsela.com\/articles\/turtle-navigation\/id\/7010\/","normalized_url":"https:\/\/www.newsela.com\/articles\/turtle-navigation\/id\/7010\/","share_count":9000,"like_count":0,"comment_count":0,"total_count":0,"click_count":0,"comments_fbid":null,"commentsbox_count":0}]';
    assert.strictEqual(facebookParser(mockedResponseBody), 9000);
  });

  it('should correctly parse the twitter count', function() {
    var twitterParser = parser('twitter');
    var mockedResponseBody = '{"count":9000,"url":"https:\/\/newsela.com\/articles\/turtle-navigation\/id\/7010\/"}';
    assert.strictEqual(twitterParser(mockedResponseBody), 9000);
  });

  it('should correctly parse the pinterest count', function() {
    var pinterestParser = parser('pinterest');
    var mockedResponseBody = 'receiveCount({"url":"https://newsela.com/articles/turtle-navigation/id/7010/","count":9000})';
    assert.strictEqual(pinterestParser(mockedResponseBody), 9000);
  });

});
