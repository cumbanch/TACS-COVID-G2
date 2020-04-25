const axios = require('axios');
const { inspect } = require('util');

const logger = require('../logger');
const { baseUrl, timeserieEndpoint, latestEndpoint } = require('../../config').covidApi;
const { externalService } = require('../errors/builders');

const getLatestByIso2 = (iso2, transformResponse) => {
  const options = {
    transformResponse: [transformResponse]
  };
  const url = `${baseUrl}${latestEndpoint}${iso2}`;
  return axios.get(url, options);
};

const getTimeseriesByIso2 = (iso2, transformResponse) => {
  const options = {
    transformResponse: [transformResponse]
  };
  const url = `${baseUrl}${timeserieEndpoint}${iso2}`;
  return axios.get(url, options);
};

const getLatest = (country, transformResponse) => getLatestByIso2(country.dataValues.iso2, transformResponse);

const getTimeseries = (country, transformResponse) =>
  getTimeseriesByIso2(country.dataValues.iso2, transformResponse);

exports.getLatestByList = list => {
  const promises = list.countries.map(country =>
    getLatest(country, data => {
      const parsedData = JSON.parse(data)[0];
      let countryFounded = {};
      if (parsedData) {
        countryFounded = list.countries.find(({ iso2 }) => iso2 === parsedData.countrycode.iso2);
        delete countryFounded.dataValues.CountryByList;
      }
      const latest = parsedData && {
        confirmed: parsedData.confirmed,
        deaths: parsedData.deaths,
        recovered: parsedData.recovered
      };
      return { ...countryFounded.dataValues, latest };
    })
  );
  return axios
    .all(promises)
    .then(responses => {
      const latestResults = responses.filter(({ data }) => data.latest).map(({ data }) => data.latest);
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
      /*
        Esto queda comentado hasta que definamos que control usar para graficar en el frontend

        var history = [];
        json[0].timeseries.forEach(date_serie => {
          history.push({
            timestamp: date_serie,
            confirmed: json[0].timeseries[date_serie].confirmed,
            deaths: json[0].timeseries[date_serie].deaths,
            recovered: json[0].timeseries[date_serie].recovered
          });
        }
        */
    })
  );
  return axios.all(promises).catch(err => {
    logger.error(inspect(err));
    throw externalService(`There was an error getting the history, reason: ${err.message}`);
  });
};
