const logger = require('pino')({
  prettyPrint: {
    translateTime: true,
    colorize: false
  }
});

module.exports = { info: logger.info, error: logger.error };
