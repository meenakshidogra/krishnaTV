/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /playlists              ->  index
 * POST    /playlists              ->  create
 * GET     /playlists/:id          ->  show
 * PUT     /playlists/:id          ->  update
 * DELETE  /playlists/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Playlist = require('./playlist.model');

// Get list of playlists
exports.index = function(req, res) {
  Playlist.find(function (err, playlists) {
    if(err) { return handleError(res, err); }
    res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    return res.json(200, playlists);
  });
};

// Get a single playlist
exports.show = function(req, res) {
  Playlist.findById(req.params.id, function (err, playlist) {
    if(err) { return handleError(res, err); }
    if(!playlist) { return res.send(404); }
    res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    return res.json(playlist);
  });
};

// Creates a new playlist in the DB.
exports.create = function(req, res) {
  Playlist.create(req.body, function(err, playlist) {
    if(err) { return handleError(res, err); }
    return res.json(201, playlist);
  });
};

// Updates an existing playlist in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Playlist.findById(req.params.id, function (err, playlist) {
    if (err) { return handleError(res, err); }
    if(!playlist) { return res.send(404); }
    var updated = _.merge(playlist, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, playlist);
    });
  });
};

// Deletes a playlist from the DB.
exports.destroy = function(req, res) {
  Playlist.findById(req.params.id, function (err, playlist) {
    if(err) { return handleError(res, err); }
    if(!playlist) { return res.send(404); }
    playlist.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
