const { inspect } = require('util');

const logger = require('../logger');
const { Country } = require('../models');
const { databaseError } = require('../errors/builders');

exports.getAllCountries = filters => {
  logger.info(`Attempting to get countries with filters: ${inspect(filters)}`);
  return Country.findAndCountAll({
    offset: (filters.page - 1) * filters.limit,
    limit: filters.limit,
    order: filters.orderColumn ? [[filters.orderColumn, filters.orderType || 'ASC']] : undefined
  }).catch(error => {
    throw databaseError(`There was an error getting countries: ${error.message}`);
  });
};

exports.getCountry = filters => {
  logger.info(`Attempting to get country with filters: ${inspect(filters)}`);
  return Country.findByPk(filters.id).catch(error => {
    throw databaseError(`There was an error getting country: ${error.message}`);
  });
};
