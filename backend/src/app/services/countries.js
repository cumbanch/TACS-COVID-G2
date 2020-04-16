const { inspect } = require('util');

const logger = require('../logger');
const { Country } = require('../models');

exports.getAllCountries = filters => {
  logger.info(`Attempting to get countries with filters: ${inspect(filters)}`);
  return Country.findAndCountAll({
    offset: (filters.page - 1) * filters.limit,
    limit: filters.limit,
    order: filters.orderColumn ? [filters.orderColumn, filters.orderType || 'ASC'] : undefined
  }).then(countries => ({
    rows: countries.rows,
    count: countries.count
  }));
};
