const { inspect } = require('util');

const logger = require('../logger');
const {
  Country,
  sequelizePackage: { Op },
  List
} = require('../models');
const { deleteUndefined } = require('../utils/objects');
const { databaseError } = require('../errors/builders');

exports.getAllCountries = params => {
  logger.info(`Attempting to get countries with params: ${inspect(params)}`);
  const filters = {
    iso2: params.isocode2 && { [Op.iLike]: `%${params.isocode2}%` },
    iso3: params.isocode3 && { [Op.iLike]: `%${params.isocode3}%` },
    name: params.name && { [Op.iLike]: `%${params.name}%` }
  };
  const sequelizeOptions = {
    where: deleteUndefined(filters),
    offset: (params.page - 1) * params.limit,
    limit: params.limit,
    order: params.orderColumn ? [[params.orderColumn, params.orderType || 'ASC']] : undefined
  };
  return Country.findAndCountAll(sequelizeOptions).catch(err => {
    /* istanbul ignore next */
    logger.error(inspect(err));
    /* istanbul ignore next */
    throw databaseError(`Error getting countries, reason: ${err.message}`);
  });
};

exports.getCountry = filters => {
  logger.info(`Attempting to get country with filters: ${inspect(filters)}`);
  return Country.findByPk(filters.id).catch(error => {
    /* istanbul ignore next */
    logger.error(inspect(error));
    /* istanbul ignore next */
    throw databaseError(`There was an error getting country: ${error.message}`);
  });
};

exports.getCountryBy = params => {
  logger.info(`Attempting to get country with params: ${inspect(params)}`);
  const filters = {
    name: params.name && { [Op.iLike]: `%${params.name}%` }
  };
  const sequelizeOptions = {
    where: filters
  };
  return Country.findAndCountAll(sequelizeOptions).catch(err => {
    /* istanbul ignore next */
    logger.error(inspect(err));
    throw databaseError(`Error getting country, reason: ${err.message}`);
  });
};

exports.getCountryWithList = filters => {
  logger.info(`Attempting to get country with filters: ${inspect(filters)}`);
  return Country.findOne({
    where: { id: filters.id },
    include: [
      {
        model: List,
        as: 'lists',
        where: { userId: filters.userId }
      }
    ]
  }).catch(error => {
    /* istanbul ignore next */
    logger.error(inspect(error));
    /* istanbul ignore next */
    throw databaseError(`There was an error getting country: ${error.message}`);
  });
};
