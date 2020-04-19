const { inspect } = require('util');

const logger = require('../logger');
const { TokenBlackList } = require('../models');
const { databaseError } = require('../errors/builders');

exports.getBy = filters => {
  logger.info(`Attempting to get token in the black list with filters: ${inspect(filters)}`);
  return TokenBlackList.findOne({ where: filters }).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting a token in the black list, reason: ${err.message}`);
  });
};

exports.create = attrs => {
  logger.info(`Attempting to create token in the black list with attributes: ${inspect(attrs)}`);
  return TokenBlackList.upsert(attrs).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error creating a token in the black list, reason: ${err.message}`);
  });
};
