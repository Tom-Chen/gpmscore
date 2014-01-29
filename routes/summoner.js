var lol = require('loljs');
var KEY = '9b831d26-8356-4aa2-bbaa-79a0302b6ce9';
var champData = require('../public/javascripts/champData412.js').data();

exports.index = function(req, res){
  res.render('index', { title: 'GPMScore' });
};

exports.champlist = function(req, res) {
  var champList = require('../public/javascripts/champion.json').data;
  var minReq = [];
  for (var champ in champList) {
    minReq.push({'id': champList[champ]['key'], 'name': champList[champ]['name'], 'value': champList[champ]['tags'][0]});
  }
  res.send(minReq);
};

exports.getinfo = function(req, res){
  lol.getSummonerByName(KEY, 'na', req.body.name, function(err, summoner) {
    if(err || !(summoner.name)) {
      res.send({error: 'true', data: 'Error, or no summoner with that name found.'});
    }
    if(summoner.name) {
      var games = [];
      lol.getRecentGames(KEY, 'na', summoner, function(err, recent_games) {
        if(err) {
          res.send({error: 'true', data: "Error retrieving games. Please try again later."});
        }
        if(!err) {
          for (var j = 0; j < recent_games.length; j++) {
            var champCat = champData.filter(function(i){return i.id == recent_games[j].championId});
            var gpmData = recent_games[j].statistics.filter(function(i){return i.id == 2 || i.id == 40}).concat(champCat);
            games.push(gpmData);
          }
          res.send({error: 'false', data: games});
        }
      });
    }
  })
};