const axios = require('axios');
const { inspect } = require('util');

const logger = require('../logger');
const { baseUrl, timeseriesEndpoint, latestEndpoint } = require('../../config').covidApi;
const { externalService, notFound } = require('../errors/builders');
const { moment } = require('../utils/moment');

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

const getBlankTimeserie = date => ({
  confirmed: 0,
  deaths: 0,
  recovered: 0,
  date
});

const processNegativeOffset = country => {
  const firstDate = moment(country.timeseries[0].date, 'YYYY-MM-DD');
  const offset = Math.abs(country.offset);
  for (let i = 0; i < offset; i++) {
    firstDate.subtract(1, 'days');
    country.timeseries.unshift(getBlankTimeserie(firstDate.format('YYYY-MM-DD')));
  }
  country.offset = 0;
};

const processPositiveOffset = country => {
  let i = 0;
  for (; i < country.offset; i++) {
    if (country.timeseries[0].confirmed === 0) country.timeseries.shift();
    else break;
  }
  country.offset -= i;
};

const someCountryHasOffsetToProcess = countries => countries.some(country => country.data.offset !== 0);

const getCountryWithOffsetToProcess = countries => countries.filter(country => country.data.offset)[0];

const processOffsets = countries => {
  let country = null;
  let otherCountries = null;
  while (someCountryHasOffsetToProcess(countries)) {
    country = getCountryWithOffsetToProcess(countries);
    if (country.data.offset < 0) {
      processNegativeOffset(country.data);
    } else if (country.data.offset > 0) {
      processPositiveOffset(country.data);
      if (country.data.offset > 0) {
        // eslint-disable-next-line no-loop-func
        otherCountries = countries.filter(otherCountry => otherCountry.data.id !== country.data.id);
        // eslint-disable-next-line no-loop-func
        otherCountries.forEach(otherCountry => (otherCountry.data.offset -= country.data.offset));
        country.data.offset = 0;
      }
    }
  }
};

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

exports.getTimeseriesByList = (list, offsets) => {
  const promises = list.countries.map(country =>
    getTimeseries(country, data => {
      const parsedData = JSON.parse(data)[0];
      let countryFounded = country;
      if (parsedData) {
        countryFounded = list.countries.find(({ iso2 }) => iso2 === parsedData.countrycode.iso2);
        if (countryFounded) delete countryFounded.dataValues.CountryByList;
      }

      let timeseries = [];
      if (parsedData) {
        timeseries = Object.keys(parsedData.timeseries).map(date => ({
          ...parsedData.timeseries[date],
          date: moment(date, 'M/DD/YY').format('YYYY-MM-DD')
        }));
      } else {
        // fill with ceros
        const start = moment('2020-01-01');
        for (let end = moment().subtract(1, 'day'); start.isBefore(end); start.add(1, 'day')) {
          timeseries.push(getBlankTimeserie(start.format('YYYY-MM-DD')));
        }
      }
      return { ...countryFounded.dataValues, timeseries };
    })
  );
  return axios
    .all(promises)
    .then(countries => {
      const firstDateOfList = countries
        .map(country => {
          let firstDateOfCountry = null;
          country.data.timeseries.some(timeserie => {
            if (timeserie.confirmed !== 0) {
              firstDateOfCountry = timeserie.date;
              return true;
            }
            return false;
          });
          return firstDateOfCountry;
        })
        .sort()[0];
      countries.forEach(country => {
        country.data.timeseries = country.data.timeseries.filter(
          timeserie => timeserie.date >= firstDateOfList
        );
        if (offsets) {
          const offsetsForCountry = offsets.filter(
            offsetCountry => offsetCountry.country_id === country.data.id
          );
          const offsetForCountry = offsetsForCountry[0];
          country.data.offset = offsetForCountry ? offsetForCountry.offset : 0;
        }
      });
      if (offsets) processOffsets(countries);
      return countries;
    })
    .catch(err => {
      logger.error(inspect(err));
      throw externalService(`There was an error getting the history, reason: ${err.message}`);
    });
};
