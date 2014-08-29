// Dependencies
var app = require('express')();
var logger = require('../logger');

// Locals
var db = {};

// Verbs
app.route('/notes/:id?')

  .all(function(req, res, next) {
    logger.info(req.method, req.path, req.body);
    res.set('Content-Type', 'application/json');
    next();
  })

  .post(function(req, res) {
    var newNote = req.body.note;
    newNote.id = Date.now();
    db[newNote.id] = newNote;

    res
      .status(201)
      .json({
        note: db[newNote.id]
      });
  })

  .get(function(req, res) {
    var id = req.params.id;
    if(!id) {
      return next();
    }

    var note = db[id];
    if(!note) {
      return res
        .status(404)
        .send({});
    }

    res.json({
      note: note
    });
  });

module.exports = app;
