var express = require('express');
var app = express();
var http = require('http').Server(app);
//test

app.get('/css-dev/*', function(req, res) {
  res.sendFile(__dirname+req.path);
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/js/main.js', function(req, res) {
  res.sendFile(__dirname + '/js/main.js');
});

//  app.get('/jade.html', function(req, res) {
//  res.sendFile(__dirname + '/jade.html');
//  });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
