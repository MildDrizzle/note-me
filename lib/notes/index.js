// Dependencies
var app = require('express')();
var logger = require('../logger');
var _ = require('lodash');

// Locals
var db = {};

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
    var newNote = req.body.note;
    newNote.id = Date.now();
    db[newNote.id] = newNote;

    res
      .status(201)
      .json({
        note: db[newNote.id]
      });
  })

  // GET
  .get(function(req, res, next) {
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
  })

  //PUT
  .put(function(req, res) {
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
  .delete(function(req, res) {
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
