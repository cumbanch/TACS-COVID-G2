const pagination = require('./pagination');
const authorization = require('./authorizations');
const { userId, userName, password, email } = require('../errors/schema_messages');

exports.getUsersSchema = { ...authorization, ...pagination };

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
