const { pagination } = require('./common');

exports.getCountriesMapper = req => ({
  ...pagination(req),
  name: req.query.name,
  isocode2: req.query.isocode2,
  isocode3: req.query.isocode3
});
