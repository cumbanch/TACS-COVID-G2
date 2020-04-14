const { pagination, idParam } = require('./common');

const getListId = req => ({ listId: req.params.id });

const countryByListAttributes = req => ({
  name: req.body.name,
  countriesIds: req.body.countries_id,
  ...idParam(req)
});

exports.getCountriesByListMapper = req => ({ ...pagination(req), ...getListId(req) });

exports.createCountriesByListMapper = countryByListAttributes;

exports.deleteCountriesByListMapper = countryByListAttributes;

exports.getLatestMapper = getListId;

exports.getHistoryMapper = getListId;
