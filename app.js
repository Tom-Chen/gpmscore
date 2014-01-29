
/**
 * Module dependencies.
 */

var express = require('express');
var summoner = require('./routes/summoner');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var gpmmodel = require('./models/model');

var app = express();

// all environments
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/gpmscore', function (err, res) {
  if (err)
    {console.log ('Error connecting to DB.')}
  else
    {console.log ('Successfully connected to DB.')}
});
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', summoner.index);
app.post('/getinfo', summoner.getinfo);
app.get('/list', summoner.champlist);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
