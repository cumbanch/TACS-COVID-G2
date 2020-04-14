const { minLevel } = require('../../config').logger;

const logger = require('pino')({
  level: minLevel,
  prettyPrint: {
    translateTime: true,
    colorize: true
  }
});

module.exports = logger;
