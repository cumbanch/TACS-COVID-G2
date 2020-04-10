const logger = require('pino');

module.exports = logger({
  prettyPrint: {
    translateTime: true,
    colorize: false
  }
});
