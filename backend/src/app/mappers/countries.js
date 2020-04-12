const { pagination } = require('./common');

exports.getCountriesMapper = req => ({ ...pagination(req) });
