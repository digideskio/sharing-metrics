# sharing-metrics

Asynchronous social sharing metrics. By default only facebook and twitter share
counts are enabled. Please see the example to get started.

### Installation
```
npm install sharing-metrics --save
```

### API Providers
These are the available providers.

- facebook: `https://api.facebook.com/method/links.getStats?format=json&urls=`
- twitter: `http://urls.api.twitter.com/1/urls/count.json?url=`
- pinterest: `http://api.pinterest.com/v1/urls/count.json?url=`

### Contributions
Contributions are welcomed! Please fork this repo or file an issue if would
like to add another provider. Documentation is also welcomed.
