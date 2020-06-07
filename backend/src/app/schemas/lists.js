const pagination = require('./pagination');
const authorization = require('./authorizations');
const {
  latitude,
  longitude,
  listName,
  countries,
  listId,
  offsets,
  countryName,
  countryId,
  listIdArray,
  listArray,
  lastDays
} = require('../errors/schema_messages');
const { isArray, isInteger } = require('../utils/lodash');
const { Country, List } = require('../models');

const commonAttributes = {
  name: {
    in: ['body'],
    isString: true,
    trim: true,
    errorMessage: listName
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
  ...pagination(List),
  name: {
    ...commonAttributes.name,
    optional: true
  },
  createdAtFromXLastDays: {
    in: ['query'],
    isInt: true,
    toInt: true,
    trim: true,
    optional: true,
    errorMessage: lastDays
  }
};

exports.createListSchema = {
  ...authorization,
  name: {
    ...commonAttributes.name
  },
  countries: {
    ...commonAttributes.countries
  }
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

exports.getListSchema = {
  ...authorization,
  id: commonAttributes.id
};

exports.deleteListSchema = {
  ...authorization,
  id: commonAttributes.id
};

exports.getLatestResultListSchema = {
  ...authorization,
  id: commonAttributes.id
};

exports.getHistoryResultListSchema = {
  ...authorization,
  id: commonAttributes.id,
  offsets: {
    in: ['query'],
    isJSON: true,
    optional: true,
    errorMessage: offsets
  }
};

exports.getCountriesByListSchema = {
  ...authorization,
  ...pagination(Country),
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
  ...authorization,
  id: commonAttributes.id,
  country_id: commonAttributes.country_id
};

exports.deleteCountryInListSchema = {
  ...authorization,
  id: commonAttributes.id,
  country_id: commonAttributes.country_id
};

exports.compareListsSchema = {
  ...authorization,
  lists: {
    in: ['body'],
    isArray: {
      options: {
        min: 2
      }
    },
    errorMessage: listArray
  },
  'lists[*]': {
    in: ['body'],
    isInt: {
      options: { min: 1 }
    },
    toInt: true,
    trim: true,
    errorMessage: listIdArray
  }
};

exports.getCloserCountriesSchema = {
  ...authorization,
  latitude: { in: ['query'], isString: true, trim: true, errorMessage: latitude, optional: true },
  longitude: { in: ['query'], isString: true, trim: true, errorMessage: longitude, optional: true },
  offsets: {
    in: ['query'],
    isJSON: true,
    optional: true,
    errorMessage: offsets
  }
};
