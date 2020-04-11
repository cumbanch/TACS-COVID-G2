const logger = require('pino')({
  prettyPrint: {
    translateTime: true,
    colorize: false
  }
});

module.exports = logger;
