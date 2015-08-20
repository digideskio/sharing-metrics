# sharing-metrics

This is an node module to asynchronously retrieve social sharing metrics.
Please see the example to get started.

### Installation
```
npm install sharing-metrics --save
```

### API Providers
These are the available providers. By default only facebook and twitter share counts are enabled.

- facebook: `https://api.facebook.com/method/links.getStats?format=json&urls=`
- twitter: `http://urls.api.twitter.com/1/urls/count.json?url=`
- pinterest: `http://api.pinterest.com/v1/urls/count.json?url=`

### Documentation

```javascript
var shares = require('sharing-metrics');

// Enable a provider.
shares.enable('pinterest');

// Disable a provider.
shares.disable('facebook');

// Sample URL to track sharing metrics.
var url = 'https://newsela.com/articles/puertorico-economy/';

// Call `getCount` which takes in the url and a callback.
shares.getCount(url, function(error, tally) {
  console.log(tally);
});
```

**Sample output**
```
{ total: 1, twitter: 0, pinterest: 1 }
```

### Contributions
Contributions are welcomed! Please fork this repo or file an issue if would
like to add another provider. Documentation and examples are also welcomed.
