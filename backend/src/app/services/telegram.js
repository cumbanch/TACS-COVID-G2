const { inspect } = require('util');

const logger = require('../logger');
const { Telegram, sequelizeInstance } = require('../models');
const { databaseError, notFound } = require('../errors/builders');

exports.getTelegram = (filters, options = {}) => {
    logger.info(`Attempting to get telegram with filters: ${inspect(filters)}`);
    return Telegram.findOne({
      where: {
        id: filters.id,
        userId: filters.userId
      },
      ...options
    }).catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error getting the telegram: ${err.message}`);
    });
  };
  
exports.deleteTelegram = filters => {
    logger.info(`Attempting to delete telegram with filters: ${inspect(filters)}`);
    return this.getTelegram(filters).then(telegram => {
      if (!telegram) {
        throw notFound('The telegram was not found');
      }
      return sequelizeInstance
        .transaction(transaction => telegram.destroy({ transaction }))
        .catch(err => {
          logger.error(inspect(err));
          throw databaseError(`There was an error deleting the telegram: ${err.message}`);
        });
    });
  };
  
  exports.createTelegram = attributes => {
    logger.info(`Attempting to create telegram with attributes: ${inspect(attributes)}`);
    return sequelizeInstance
      .transaction(transaction =>
        Telegram.create(attributes, { transaction })
      )
      .catch(err => {
        logger.error(inspect(err));
        throw databaseError(`There was an error telegram the list: ${err.message}`);
      });
  };