var winston = require('winston');

module.exports = new (winston.logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      prettyPrint: true,
      level: 'debug',
      label: 'notes API'
    })
  ]
});
