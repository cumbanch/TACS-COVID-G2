const { factory } = require('factory-girl');

const { factoryWithCustomizedValue } = require('./factory_by_models');

const modelName = 'List';

factoryWithCustomizedValue(modelName, { deletedAt: null });

module.exports = {
  createList: list => factory.create(modelName, list),
  buildList: list => factory.build(modelName, list),
  createManyLists: ({ list, quantity }) => factory.createMany(modelName, quantity, list)
};
