require('dotenv').config();

const config = {
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logging: process.env.POSTGRES_LOGGING,
    dialect: 'postgres'
  },
  migrations: {
    automaticallyUp: process.env.AUTOMATICALLY_UP
  },
  server: {
    port: process.env.PORT || 8080,
    defaultPagination: process.env.DEFAULT_PAGINATION || 20,
    momentTimezone: process.env.MOMENT_TIMEZONE || 'America/Buenos_Aires',
    corsWhitelist: process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : []
  },
  logger: {
    minLevel: process.env.LOGGER_MIN_LEVEL || 'debug'
  }
};

module.exports = config;
