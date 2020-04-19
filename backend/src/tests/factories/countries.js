const { factory } = require('factory-girl');

const { factoryWithCustomizedValue } = require('./factory_by_models');

const modelName = 'Country';

factoryWithCustomizedValue(modelName, { deletedAt: null });

module.exports = {
  createCountry: country => factory.create(modelName, country),
  buildCountry: country => factory.build(modelName, country),
  createManyCountries: ({ country, quantity }) => factory.createMany(modelName, quantity, country)
};
