require('es6-promise').polyfill();
require('isomorphic-fetch');

var express = require('express');
var app = express();
var Unsplash = require('unsplash-js').default;

app.use(express.static('static/public'));

var unsplash = new Unsplash({
  applicationId: 'c9c7d0d1c89d5bcfc8b27f3fafc0c825b2fb6b0f542b6c5a3e07c26af2b5e38b',
  secret: '79d67fbd7bdc88326f1e0655b86d4761aa9641842368d42a3e5fd19968a5a98a',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob'
});

app.get('/', function(req, res){
  var authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public"
  ]);
  res.redirect(authenticationUrl);
});

app.get('/photo', function(req, res){
  unsplash.photos.getRandomPhoto({  })
  .then(unsplash.toJson)
  .then(json => {
    var result = JSON.stringify(json);
    console.log(JSON.parse(result));
    res.end(result);
  });
});

app.listen(process.env.PORT || 8000);