const { objectToSnakeCase } = require('../utils/objects');

exports.login = tokens => objectToSnakeCase(tokens);
