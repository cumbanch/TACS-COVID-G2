const { objectToSnakeCase } = require('../utils/objects');

exports.getListSerializer = list => objectToSnakeCase(list);
