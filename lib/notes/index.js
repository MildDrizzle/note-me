var app = require('express')();
var logger = require('../logger');

var db = {};

// Methods

//POST
app.post('/', function(req, res) {
  logger.info('POST', req.body);

  var newNote = req.body.note;
  newNote.id = Date.now();

  db[newNote.id] = newNote;

  res.set('Content-Type', 'application/json');
  res.status(201);

  res.json({
    note: db[newNote.id]
  });

});

// GET
app.get('/:id', function(req, res) {
  logger.info('GET /notes/%s', req.params.id);

  var id = req.params.id;
  var note = db[id];

  if(!note) {
    res.status(404);
    return res.send('Not Found');
  }

  res.json({
    note: note
  });

});

module.exports = app;
