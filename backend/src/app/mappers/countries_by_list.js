const { pagination, idParam } = require('./common');

const getListId = req => ({ listId: req.params.id });

const countryByListAttributes = req => ({
  countryId: req.body.country_id,
  ...idParam(req)
});

exports.getCountriesByListMapper = req => ({
  ...pagination(req),
  ...getListId(req),
  countryName: req.query.country_name
});

exports.createCountriesByListMapper = countryByListAttributes;

exports.deleteCountriesByListMapper = countryByListAttributes;

exports.getLatestMapper = getListId;

exports.getHistoryMapper = req => ({ ...getListId(req), offset: req.query.offset });
