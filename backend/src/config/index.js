require('dotenv').config();

const config = {
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logging: process.env.POSTGRES_LOGGING || 'false',
    dialect: 'postgres'
  },
  migrations: {
    automaticallyUp: process.env.AUTOMATICALLY_UP || false
  },
  server: {
    port: process.env.PORT || 8080,
    defaultPagination: process.env.DEFAULT_PAGINATION || 20,
    momentTimezone: process.env.MOMENT_TIMEZONE || 'America/Buenos_Aires',
    initialPasswordAdmin: process.env.PASSWORD_ADMIN
  },
  logger: {
    minLevel: process.env.LOGGER_MIN_LEVEL || 'debug'
  },
  session: {
    secret: process.env.SECRET,
    expirationUnitAccessToken: process.env.EXPIRATION_UNIT_ACCESS_TOKEN || 'minutes',
    expirationUnitRefreshToken: process.env.EXPIRATION_UNIT_REFRESH_TOKEN || 'hours',
    expirationUnitIdToken: process.env.EXPIRATION_UNIT_ID_TOKEN || 'minutes',
    expirationValueAccessToken: process.env.EXPIRATION_VALUE_ACCESS_TOKEN || 15,
    expirationValueRefreshToken: process.env.EXPIRATION_VALUE_REFRESH_TOKEN || 24,
    expirationValueIdToken: process.env.EXPIRATION_VALUE_ID_TOKEN || 10,
    hashingSalts: process.env.HASHING_SALTS,
    externalTokenHeaderName: process.env.EXTERNAL_TOKEN_HEADER_NAME || 'x-external-token',
    externalProviderNameHeaderName:
      process.env.EXTERNAL_PROVIDER_NAME_HEADER_NAME || 'x-external-provider-name'
  },
  externalProviders: {
    facebookUrl: process.env.CHECK_FACEBOOK_TOKEN_URL || 'https://graph.facebook.com/me'
  },
  covidApi: {
    baseUrl: process.env.COVID_API_BASE,
    timeseriesEndpoint:
      process.env.COVID_API_TIMESERIES_ENDPOINT || '/jhu-edu/timeseries?onlyCountries=true&iso2=',
    latestEndpoint: process.env.COVID_API_LATEST_ENDPOINT || '/jhu-edu/latest?onlyCountries=true&iso2='
  },
  telegram: {
    apiKey: process.env.TELEGRAM_API_KEY,
    listPagination: parseInt(process.env.TELEGRAM_LIST_PAGINATION) || 15
  }
};

module.exports = config;
