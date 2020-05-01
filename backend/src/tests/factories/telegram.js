const { factory } = require('factory-girl');

const { factoryWithCustomizedValue } = require('./factory_by_models');

const modelName = 'Telegram';

factoryWithCustomizedValue(modelName, { deletedAt: null });

module.exports = {
  createTelegram: telegram => factory.create(modelName, telegram),
  buildTelegram: telegram => factory.build(modelName, telegram),
  createManyTelegram: ({ telegram, quantity }) => factory.createMany(modelName, quantity, telegram)
};
