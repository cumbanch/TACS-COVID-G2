const { pagination, idParam } = require('./common');

const listAttributesMapper = req => ({
  name: req.body.name,
  countriesIds: req.body.countries_id
});

exports.getListsMapper = req => ({ ...pagination(req) });

exports.getListMapper = idParam;

exports.deleteListMapper = idParam;

exports.createListMapper = listAttributesMapper;

exports.updateListMapper = listAttributesMapper;

exports.getCountriesListMapper = {
  ...idParam,
  ...pagination
};
