// Module dependencies
var express = require('express');

// Locals
var app = module.exports = express();
var port = process.env.PORT | 3000;

// Start server if we're not someone else's dependency
if(!module.parent) {
  app.listen(port, function() {
    logger.info('API running at http://localhost:%s/', port);
  });
}
