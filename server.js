// Module dependencies
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('./lib/logger');


// Locals
var app = module.exports = express();
var port = process.env.PORT | 3000;
var db = {} // Memory persitence

// Middlewares
app.use(bodyParser.json('application/json'));

// Routes
app.post('/notes', function(req, res) {
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

app.get('/notes/:id', function(req, res) {
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

// Start server if we're not someone else's dependency
if(!module.parent) {
  app.listen(port, function() {
    logger.info('API running at http://localhost:%s/', port);
  });
}
