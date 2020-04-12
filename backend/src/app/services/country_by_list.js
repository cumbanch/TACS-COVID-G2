const { inspect } = require('util');

const logger = require('../logger');
const { moment } = require('../utils/moment');

const countriesMock = [
  {
    id: 1,
    name: 'Argentina',
    iso2: 'AR',
    iso3: 'ARG',
    latitude: -34,
    longitude: -64,
    createdAt: moment().format(),
    updatedAt: moment().format(),
    deletedAt: null
  },
  {
    id: 2,
    name: 'Brazil',
    iso2: 'BR',
    iso3: 'BRA',
    latitude: -10,
    longitude: -55,
    createdAt: moment().format(),
    updatedAt: moment().format(),
    deletedAt: null
  }
];

const countriesByListMock = listId => [
  {
    id: 1,
    listId,
    countryId: 1,
    country: countriesMock[0]
  },
  {
    id: 2,
    listId,
    countryId: 2,
    country: countriesMock[1]
  }
];

exports.getCountriesByList = filters => {
  logger.info(`Attempting to get countries by list with filters: ${inspect(filters)}`);
  return Promise.resolve({ rows: countriesMock, count: countriesMock.length });
};

exports.createCountriesByList = attributes => {
  logger.info(`Attempting to create countries by list with attributes: ${inspect(attributes)}`);
  return Promise.resolve();
};

exports.deleteCountriesByList = attributes => {
  logger.info(`Attempting to delete countries by list with attributes: ${inspect(attributes)}`);
  return Promise.resolve();
};

exports.getCountriesByListBy = filters => {
  logger.info(`Attempting to get countries by list with filters: ${inspect(filters)}`);
  return Promise.resolve(countriesByListMock);
};
