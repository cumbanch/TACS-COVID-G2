const pagination = require('./pagination');
const authorization = require('./authorizations');
const { userId, userName, password, email } = require('../errors/schema_messages');

exports.getUsersSchema = { ...authorization, ...pagination };
