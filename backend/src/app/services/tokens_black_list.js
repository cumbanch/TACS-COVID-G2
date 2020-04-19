const { inspect } = require('util');

const logger = require('../logger');
const { TokenBlacklist } = require('../models');
const { databaseError } = require('../errors/builders');

exports.getTokenBlacklistBy = filters => {
  logger.info(`Attempting to get token in the blacklist with filters: ${inspect(filters)}`);
  return TokenBlacklist.findOne({ where: filters }).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting a token in the black list, reason: ${err.message}`);
  });
};

exports.createTokenBlacklist = attrs => {
  logger.info(`Attempting to create token in the blacklist with attributes: ${inspect(attrs)}`);
  return TokenBlacklist.upsert(attrs).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error creating a token in the blacklist, reason: ${err.message}`);
  });
};
