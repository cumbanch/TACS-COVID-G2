require('dotenv').config();

const logger = require('pino')({
  level: process.env.LOGGER_MIN_LEVEL,
  prettyPrint: {
    translateTime: true,
    colorize: true
  }
});

module.exports = logger;
