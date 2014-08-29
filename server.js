// Module dependencies
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('./lib/logger');


// Locals
var app = module.exports = express();
var port = process.env.PORT | 3000;

// Middlewares
app.use(bodyParser.json('application/json'));

// Routes
app.post('/notes', function(req, res) {
  logger.info('POST', req.body);

  var newNote = req.body.note;
  newNote.id = '123';

  res.set('Content-Type', 'application/json');
  res.status(201);

  res.json({
    note: newNote
  });

});

// Start server if we're not someone else's dependency
if(!module.parent) {
  app.listen(port, function() {
    logger.info('API running at http://localhost:%s/', port);
  });
}
