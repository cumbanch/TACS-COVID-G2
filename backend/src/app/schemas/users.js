const pagination = require('./pagination');
const authorization = require('./authorizations');
const { userId, userName, password, email, lastAccess } = require('../errors/schema_messages');
const { User } = require('../models');

exports.getUsersSchema = {
  ...authorization,
  ...pagination(User),
  last_access: {
    in: ['query'],
    isISO8601: true,
    trim: true,
    optional: true,
    errorMessage: lastAccess
  }
};

exports.getUserSchema = {
  ...authorization,
  id: {
    in: ['params'],
    isInt: true,
    toInt: true,
    trim: true,
    errorMessage: userId
  }
};

exports.createUserSchema = {
  ...authorization,
  name: { in: ['body'], isString: true, trim: true, errorMessage: userName },
  email: { in: ['body'], isString: true, trim: true, isEmail: true, errorMessage: email },
  password: { in: ['body'], isString: true, trim: true, errorMessage: password }
};
