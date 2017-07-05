var express = require('express');
var app = express();
var request = require('request');

app.use(express.static('static/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/main.html');
});

app.get('/photo', function(req, res){
  request('http://www.splashbase.co/api/v1/images/random', function(err, response, body){
    if(err) throw err;
    res.end(JSON.parse(body).url);
  });
});

app.listen(process.env.PORT || 8000);