const { pagination, idParam } = require('./common');

const listAttributesMapper = req => ({
  name: req.body.name,
  countriesIds: req.body.countries
});

exports.getListsMapper = req => ({ ...pagination(req), name: req.query.name });

exports.getListMapper = idParam;

exports.deleteListMapper = idParam;

exports.createListMapper = listAttributesMapper;

exports.updateListMapper = { ...idParam, ...listAttributesMapper };
