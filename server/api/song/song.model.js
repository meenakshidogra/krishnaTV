'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema({
	id : String,
  title: String,
  artist: String,
  album: {},
  url: String
});

module.exports = mongoose.model('Song', SongSchema);
