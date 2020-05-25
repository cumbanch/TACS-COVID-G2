const {
  getCloserCountriesMapper,
  getCountriesMapper,
  getLatestCountryMapper
} = require('../mappers/countries');
const { getAllCountries, getCountryWithList, getCloserCountry } = require('../services/countries');
const { paginateResponse } = require('../serializers/paginations');
const { notFound, externalService } = require('../errors/builders');
const { getLatestByIso2 } = require('../services/covid_api');
const { getLatestCountrySerializer } = require('../serializers/countries');

exports.getCloserCountries = (req, res, next) => {
  const filters = getCloserCountriesMapper(req);
  return getCloserCountry(filters)
    .then(({ count, rows: data }) => res.status(200).send(paginateResponse({ ...filters, count, data })))
    .catch(next);
};

exports.getAllCountries = (req, res, next) => {
  const filters = getCountriesMapper(req);
  return getAllCountries(filters)
    .then(({ count, rows: data }) => res.status(200).send(paginateResponse({ ...filters, count, data })))
    .catch(next);
};

exports.getLatestCountry = (req, res, next) => {
  const filters = getLatestCountryMapper(req);
  return getCountryWithList(filters)
    .then(country => {
      if (!country) throw notFound('Country not found');
      return getLatestByIso2(country.iso2.toUpperCase())
        .then(({ data }) =>
          res
            .status(200)
            .send(getLatestCountrySerializer(data))
            .end()
        )
        .catch(err => {
          throw externalService(`There was an error getting the latest results, reason: ${err.message}`);
        });
    })
    .catch(next);
};
