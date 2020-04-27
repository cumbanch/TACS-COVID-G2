const { inspect } = require('util');

const logger = require('../logger');
const { Telegram, sequelizeInstance } = require('../models');
const { databaseError, notFound } = require('../errors/builders');

exports.getTelegramBy = (filters, options = {}) => {
  logger.info(`Attempting to get telegram with filters: ${inspect(filters)}`);
  return Telegram.findOne({
    where: {
      chatId: `${filters.chatId}`
    },
    ...options
  }).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error getting the telegram: ${err.message}`);
  });
};

exports.deleteTelegram = filters => {
  logger.info(`Attempting to delete telegram with filters: ${inspect(filters)}`);
  return this.getTelegramBy(filters)
    .then(telegram => telegram.destroy())
    .catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error deleting the telegram: ${err.message}`);
    });
};

exports.createTelegram = attributes => {
  logger.info(`Attempting to create telegram with attributes: ${inspect(attributes)}`);
  return Telegram.createOrUpdate(attributes, { chatId: attributes.chatId });
};
