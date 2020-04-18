const { pagination, idParam } = require('./common');

const listAttributesMapper = req => ({
  name: req.body.name,
  countriesIds: req.body.countries,
  userId: req.userId
});

const countryByListAttributes = req => ({
  countryId: req.body.country_id,
  ...idParam(req),
  userId: req.userId
});

exports.getListsMapper = req => ({ ...pagination(req), name: req.query.name, userId: req.userId });

exports.getListMapper = req => ({ userId: req.userId, ...idParam(req) });

exports.deleteListMapper = idParam;

exports.createListMapper = listAttributesMapper;

exports.updateListMapper = req => ({ ...idParam(req), ...listAttributesMapper(req) });

exports.getCountriesByListMapper = req => ({
  ...pagination(req),
  ...idParam(req),
  countryName: req.query.country_name,
  userId: req.userId
});

exports.createCountriesByListMapper = countryByListAttributes;

exports.deleteCountriesByListMapper = countryByListAttributes;

exports.getLatestMapper = idParam;

exports.getHistoryMapper = req => ({ ...idParam(req), offset: req.query.offset });
