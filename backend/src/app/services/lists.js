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

const listsMock = [
  {
    id: 1,
    name: 'Lista 1',
    createdAt: moment().format(),
    updatedAt: moment().format(),
    deletedAt: null,
    countries: countriesMock
  },
  {
    id: 2,
    name: 'Lista 2',
    createdAt: moment().format(),
    updatedAt: moment().format(),
    deletedAt: null,
    countries: countriesMock
  }
];

exports.getAllList = async filters => {
  logger.info(`Attempting to get lists with filters: ${inspect(filters)}`);
  return Promise.resolve({ rows: listsMock, count: listsMock.length });
};

exports.getList = filters => {
  logger.info(`Attempting to get list with filters: ${inspect(filters)}`);
  return Promise.resolve(listsMock[0]);
};

exports.deleteList = filters => {
  logger.info(`Attempting to delete list with filters: ${inspect(filters)}`);
  return Promise.resolve();
};

exports.createList = attributes => {
  logger.info(`Attempting to create list with attributes: ${inspect(attributes)}`);
  return Promise.resolve();
};

exports.updateList = attributes => {
  logger.info(`Attempting to update list with attributes: ${inspect(attributes)}`);
  return Promise.resolve();
};
