const authorization = require('./authorizations');
const { password, email, refreshToken } = require('../errors/schema_messages');

exports.loginSchema = {
  email: { in: ['body'], isString: true, trim: true, isEmail: true, errorMessage: email },
  password: { in: ['body'], isString: true, trim: true, errorMessage: password }
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
