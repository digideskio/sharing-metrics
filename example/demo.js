'use strict';

var shares = require('../src/shares');

// You can enable or disable providers like so.
shares.disable('facebook');
shares.enable('pinterest');

// Call this function which takes in a url, and a callback.
var testURL = 'https://newsela.com/articles/puertorico-economy/';
shares.getCount(testURL, function(error, tally) {
  console.log(tally);
});
