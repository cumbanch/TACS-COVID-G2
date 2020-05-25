const { pagination, idParam } = require('./common');

exports.getCloserCountriesMapper = req => ({
  ...pagination(req),
  latitude: req.query.latitude,
  longitude: req.query.longitude
});

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
