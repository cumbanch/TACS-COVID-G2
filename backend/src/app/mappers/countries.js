const { pagination, idParam } = require('./common');

exports.getCountriesMapper = req => ({
  ...pagination(req),
  name: req.query.name,
  isocode2: req.query.isocode2,
  isocode3: req.query.isocode3
});

exports.getLatestCountryMapper = req => ({
  userId: req.user.id,
  ...idParam(req)
});
