const pagination = require('./pagination');
const authorization = require('./authorizations');
const { ListName, countries, listId, offset, countryName, countryId } = require('../errors/schema_messages');
const { isArray, isInteger } = require('../utils/lodash');

const commonAttributes = {
  name: {
    in: ['body'],
    isString: true,
    trim: true,
    errorMessage: ListName
  },
  countries: {
    in: ['body'],
    custom: {
      options: value => value && value.length && isArray(value) && value.every(isInteger)
    },
    errorMessage: countries
  },
  id: {
    in: ['params'],
    isInt: true,
    toInt: true,
    trim: true,
    errorMessage: listId
  },
  country_id: {
    in: ['body'],
    isInt: true,
    toInt: true,
    trim: true,
    errorMessage: countryId
  }
};

exports.getListsSchema = {
  ...authorization,
  ...pagination,
  name: {
    ...commonAttributes.name,
    optional: true
  }
};

exports.createListSchema = {
  ...authorization,
  ...commonAttributes
};

exports.updateListSchema = {
  ...authorization,
  name: {
    ...commonAttributes.name,
    optional: true
  },
  countries: {
    ...commonAttributes.countries,
    optional: true
  },
  id: {
    in: ['params'],
    isInt: true,
    toInt: true,
    trim: true,
    errorMessage: listId
  }
};

exports.getListSchema = { id: commonAttributes.id };

exports.deleteListSchema = { id: commonAttributes.id };

exports.getLatestResultListSchema = { id: commonAttributes.id };

exports.getHistoryResultListSchema = {
  id: commonAttributes.id,
  offset: {
    in: ['query'],
    isInt: {
      options: { min: 1 }
    },
    toInt: true,
    optional: true,
    trim: true,
    errorMessage: offset
  }
};

exports.getCountriesByListSchema = {
  ...pagination,
  id: commonAttributes.id,
  country_name: {
    in: ['query'],
    isString: true,
    trim: true,
    optional: true,
    errorMessage: countryName
  }
};

exports.addCountryInListSchema = {
  id: commonAttributes.id,
  country_id: commonAttributes.country_id
};

exports.deleteCountryInListSchema = {
  id: commonAttributes.id,
  country_id: commonAttributes.country_id
};
