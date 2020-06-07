const authorization = require('./authorizations');
const {
  email,
  password,
  refreshToken,
  externalProviderName,
  externalToken
} = require('../errors/schema_messages');
const { externalTokenHeaderName, externalProviderNameHeaderName } = require('../../config').session;
const { EXTERNAL_PROVIDERS } = require('../utils/constants');

exports.loginSchema = {
  email: { in: ['body'], isString: true, trim: true, isEmail: true, errorMessage: email },
  password: { in: ['body'], isString: true, errorMessage: password }
};

exports.refreshSchema = {
  ...authorization,
  refresh_token: {
    in: ['body'],
    isJWT: true,
    trim: true,
    errorMessage: refreshToken
  }
};

exports.logoutSchema = {
  ...authorization
};

exports.externalLoginSchema = {
  [externalTokenHeaderName]: {
    in: ['headers'],
    isString: true,
    trim: true,
    errorMessage: externalToken
  },
  [externalProviderNameHeaderName]: {
    in: ['headers'],
    custom: {
      options: value =>
        value && value.length && Object.values(EXTERNAL_PROVIDERS).includes(value.toLowerCase())
    },
    trim: true,
    errorMessage: externalProviderName
  }
};
