const { inspect } = require('util');

const logger = require('../logger');
const { moment } = require('../utils/moment');

exports.getAllCountries = filters => {
  logger.info(`Attempting to get countries with filters: ${inspect(filters)}`);
  return Promise.resolve({
    rows: [
      {
        name: 'Argentina',
        iso2: 'AR',
        iso3: 'ARG',
        latitude: '78.46668',
        longitude: '-33.44844',
        createdAt: moment().format(),
        updatedAt: moment().format(),
        deletedAt: null
      },
      {
        name: 'Brasil',
        iso2: 'BR',
        iso3: 'BRA',
        latitude: '71.46668',
        longitude: '-28.44844',
        createdAt: moment().format(),
        updatedAt: moment().format(),
        deletedAt: null
      }
    ],
    count: 2
  });
};
