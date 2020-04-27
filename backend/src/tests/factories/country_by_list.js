const { factory } = require('factory-girl');

const { factoryWithCustomizedValue } = require('./factory_by_models');

const modelName = 'CountryByList';

factoryWithCustomizedValue(modelName, { deletedAt: null });

module.exports = {
  createCountryByList: countryByList => factory.create(modelName, countryByList),
  buildCountryByList: countryByList => factory.build(modelName, countryByList),
  createManyCountriesByList: ({ countryByList, quantity }) =>
    factory.createMany(modelName, quantity, countryByList)
};
