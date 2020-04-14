const pagination = require('./pagination');
const authorization = require('./authorizations');

exports.getCountriesSchema = { ...authorization, ...pagination };
