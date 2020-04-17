const { pagination, idParam } = require('./common');

const listAttributesMapper = req => ({
  name: req.body.name,
  countriesIds: req.body.countries
});

const countryByListAttributes = req => ({
  countryId: req.body.country_id,
  ...idParam(req)
});

exports.getListsMapper = req => ({ ...pagination(req), name: req.query.name });

exports.getListMapper = idParam;

exports.deleteListMapper = idParam;

exports.createListMapper = listAttributesMapper;

exports.updateListMapper = { ...idParam, ...listAttributesMapper };

exports.getCountriesByListMapper = req => ({
  ...pagination(req),
  ...idParam(req),
  countryName: req.query.country_name
});

exports.createCountriesByListMapper = countryByListAttributes;

exports.deleteCountriesByListMapper = countryByListAttributes;

exports.getLatestMapper = idParam;

exports.getHistoryMapper = req => ({ ...idParam(req) });
