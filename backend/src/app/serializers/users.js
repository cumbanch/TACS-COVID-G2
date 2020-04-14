const { objectToSnakeCase } = require('../utils/objects');

exports.getUserSerializer = user => objectToSnakeCase(user);
