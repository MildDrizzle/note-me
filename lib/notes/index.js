'use strict';

// Dependencies
var app = require('express')();
var logger = require('../logger');
var _ = require('lodash');

// Locals
var db = {};
//var Note = mongoose.model('Note');
var Note = require('./model');

// GET /notes
app.get('/notes', function(req, res) {
  logger.info(req.method, req.path, req.body);
  var notes = _.values(db);

  res
    .status(200)
    .set('Content-Type', 'application/json')
    .json({
      notes: notes
    });
});

// Verbs
app.route('/notes/:id?')

  .all(function(req, res, next) {
    logger.info(req.method, req.path, req.body);
    res.set('Content-Type', 'application/json');
    next();
  })

  // POST
  .post(function(req, res) {
    var note = req.body;
    Note.create(note, function (err, data) {
      return res
        .status(201)
        .json(data);
    });
  })

  // GET
  .get(function(req, res, next) {
    var id = req.params.id;
    if(!id) {
      return next();
    }

    Note.findById(id, function(err, note) {
      if(err){
        return res
          .status(500)
          .send(err);
      }
      res
        .status(200)
        .json(note);
    });
  })

  //PUT
  .put(function(req, res, next) {
    var id = req.params.id;
    if(!id) {
      return next();
    }

    var updatedNote = req.body.note;
    updatedNote.id = parseInt(id, 10);

    db[id] = updatedNote;

    res.json({
      note: [ db[id] ]
    });

  })

  // DELETE
  .delete(function(req, res, next) {
    var id = req.params.id;

    if(!id) {
      return next();
    }

    delete db[id];

    res
      .status(204)
      .send();
  });

module.exports = app;
