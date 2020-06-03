const { pagination, idParam } = require('./common');

const listAttributesMapper = req => ({
  name: req.body.name,
  countriesIds: req.body.countries,
  userId: req.user.id
});

const countryByListAttributes = req => ({
  countryId: req.body.country_id,
  ...idParam(req),
  userId: req.user.id
});

exports.getListsMapper = req => ({ ...pagination(req), name: req.query.name, userId: req.user.id });

exports.getListMapper = req => ({ userId: req.user.id, ...idParam(req) });

exports.deleteListMapper = req => ({ ...idParam(req), userId: req.user.id });

exports.createListMapper = listAttributesMapper;

exports.updateListMapper = req => ({ ...idParam(req), ...listAttributesMapper(req) });

exports.getCountriesByListMapper = req => ({
  ...pagination(req),
  ...idParam(req),
  countryName: req.query.country_name,
  userId: req.user.id
});

exports.createCountriesByListMapper = countryByListAttributes;

exports.deleteCountriesByListMapper = countryByListAttributes;

exports.getLatestMapper = req => ({ ...idParam(req), userId: req.user.id });

exports.getHistoryMapper = req => ({ ...idParam(req), userId: req.user.id });

exports.getListOfCloserCountriesMapper = req => ({
  ...pagination(req),
  latitude: req.query.latitude,
  longitude: req.query.longitude
});
