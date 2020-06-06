const { pagination, idParam } = require('./common');
const { moment } = require('../utils/moment');

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

exports.getListsMapper = req => ({
  ...pagination(req),
  name: req.query.name,
  userId: req.user.id,
  userType: req.user.type,
  // eslint-disable-next-line
  createdAt: req.query.last_days_to_check? moment().subtract(req.query.last_days_to_check, 'days').format('YYYY-MM-DD') : undefined
});

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

exports.getHistoryMapper = req => ({
  ...idParam(req),
  userId: req.user.id,
  offsets: req.query.offsets ? JSON.parse(req.query.offsets) : undefined
});
