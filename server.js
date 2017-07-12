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
    console.log(body);
    var obj = {'photo': JSON.parse(body).url}
    res.end(JSON.stringify(obj));
  });
});

app.get('/quote', function(req, res){
  request('http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en', function(err, response, body){
    if(err) throw err;
    res.end(JSON.stringify(body));
  });
});

app.listen(process.env.PORT || 8000);