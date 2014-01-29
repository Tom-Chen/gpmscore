var mongoose = require('mongoose');

var gpmSchema = new mongoose.Schema({
  utcTime: Number,
  summoner: String,
  region: String,
  date: String,
  gpm: Number
});

var GPM = mongoose.model('gpmscore', gpmSchema);

exports.GPM = GPM;