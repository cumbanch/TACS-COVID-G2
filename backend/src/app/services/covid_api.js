const axios = require('axios');
const { inspect } = require('util');

const logger = require('../logger');
const { baseUrl, timeseriesEndpoint, latestEndpoint } = require('../../config').covidApi;
const { externalService, notFound } = require('../errors/builders');

exports.getLatestByIso2 = iso2 => {
  const url = `${baseUrl}${latestEndpoint}${iso2}`;
  return axios.get(url);
};

const getTimeseriesByIso2 = (iso2, transformResponse) => {
  const options = {
    transformResponse: [transformResponse]
  };
  const url = `${baseUrl}${timeseriesEndpoint}${iso2}`;
  return axios.get(url, options);
};

const getTimeseries = (country, transformResponse) =>
  getTimeseriesByIso2(country.dataValues.iso2, transformResponse);

exports.getLatestByList = list => {
  if (!list) {
    throw notFound('The list was not found');
  }
  const promises = list.countries.map(country => exports.getLatestByIso2(country.dataValues.iso2));
  return axios
    .all(promises)
    .then(responses => {
      const latestResults = responses.map(({ data }) =>
        data.length ? data[0] : { confirmed: 0, deaths: 0, recovered: 0 }
      );
      const sumOfLatest = latestResults.reduce((previous, current) => ({
        confirmed: previous.confirmed + current.confirmed,
        deaths: previous.deaths + current.deaths,
        recovered: previous.recovered + current.recovered
      }));
      return sumOfLatest;
    })
    .catch(err => {
      logger.error(inspect(err));
      throw externalService(`There was an error getting the latest results, reason: ${err.message}`);
    });
};

exports.getTimeseriesByList = list => {
  const promises = list.countries.map(country =>
    getTimeseries(country, data => {
      const parsedData = JSON.parse(data)[0];
      let countryFounded = {};
      if (parsedData) {
        countryFounded = list.countries.find(({ iso2 }) => iso2 === parsedData.countrycode.iso2);
        delete countryFounded.dataValues.CountryByList;
      }
      return parsedData ? { ...countryFounded.dataValues, timeseries: parsedData.timeseries } : undefined;
    })
  );
  return axios.all(promises).catch(err => {
    logger.error(inspect(err));
    throw externalService(`There was an error getting the history, reason: ${err.message}`);
  });
};
