const { pagination, countryByListAttributes } = require('./common');

const getListId = req => ({ listId: req.params.id });

exports.getCountriesByListMapper = req => ({ ...pagination(req), ...getListId(req) });

exports.createCountriesByListMapper = countryByListAttributes;

exports.deleteCountriesByListMapper = countryByListAttributes;

exports.getLatestMapper = getListId;

exports.getHistoryMapper = getListId;
