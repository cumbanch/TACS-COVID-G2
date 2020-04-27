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
  },
  session: {
    secret: process.env.SECRET || 'top-secret',
    expirationUnitAccessToken: process.env.EXPIRATION_UNIT_ACCESS_TOKEN || 'minutes',
    expirationUnitRefreshToken: process.env.EXPIRATION_UNIT_REFRESH_TOKEN || 'hours',
    expirationUnitIdToken: process.env.EXPIRATION_UNIT_ID_TOKEN || 'minutes',
    expirationValueAccessToken: process.env.EXPIRATION_VALUE_ACCESS_TOKEN || 15,
    expirationValueRefreshToken: process.env.EXPIRATION_VALUE_REFRESH_TOKEN || 24,
    expirationValueIdToken: process.env.EXPIRATION_VALUE_ID_TOKEN || 10,
    hashingSalts: process.env.HASHING_SALTS || 10
  },
  covidApi: {
    baseUrl: process.env.COVID_API_BASE || 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai',
    briefEndpoint: process.env.COVID_API_BRIEF_ENDPOINT || '/jhu-edu/brief',
    timeserieEndpoint:
      process.env.COVID_API_TIMESERIE_ENDPOINT || '/jhu-edu/timeseries?onlyCountries=true&iso2=',
    latestEndpoint: process.env.COVID_API_LATEST_ENDPOINT || '/jhu-edu/latest?onlyCountries=true&iso2='
  }
};

module.exports = config;
