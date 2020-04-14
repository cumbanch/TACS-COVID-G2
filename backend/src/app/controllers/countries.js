const { getCountriesMapper } = require('../mappers/countries');
const { getAllCountries } = require('../services/countries');
const { paginateResponse } = require('../serializers/paginations');

exports.getAllCountries = (req, res, next) => {
  const filters = getCountriesMapper(req);
  return getAllCountries(filters)
    .then(({ count, rows: data }) => res.status(200).send(paginateResponse({ ...filters, count, data })))
    .catch(next);
};
