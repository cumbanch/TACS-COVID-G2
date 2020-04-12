const { pagination, idParam, listAttributes } = require('./common');

exports.getListsMapper = req => ({ ...pagination(req) });

exports.getListMapper = idParam;

exports.deleteListMapper = idParam;

exports.createListMapper = listAttributes;

exports.updateListMapper = listAttributes;

exports.getCountriesListMapper = {
  ...idParam,
  ...pagination
};
