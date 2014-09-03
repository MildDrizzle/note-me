'use strict';

// Module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./lib/logger');
var mongoose = require('mongoose');

// Locals
var app = module.exports = express();
var port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json('application/json'));

// Routes
var notes = require('./lib/notes');
app.use(notes);

// Start server if we're not someone else's dependency
if(!module.parent) {
  mongoose.connect('mongodb://localhost/noteme-test', function() {
    app.listen(port, function() {
      logger.info('API running at http://localhost:%s/', port);
    });
  });
}
