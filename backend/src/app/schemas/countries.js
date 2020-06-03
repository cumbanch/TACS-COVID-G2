const pagination = require('./pagination');
const authorization = require('./authorizations');
const { isocode2, isocode3, countryName, countryIdParam } = require('../errors/schema_messages');
const { Country } = require('../models');

exports.getCountriesSchema = {
  ...authorization,
  ...pagination(Country),
  name: {
    in: ['query'],
    isString: true,
    trim: true,
    errorMessage: countryName,
    optional: true
  },
  isocode2: { in: ['query'], isString: true, trim: true, errorMessage: isocode2, optional: true },
  isocode3: { in: ['query'], isString: true, trim: true, errorMessage: isocode3, optional: true }
};

exports.getLatestCountrySchema = {
  ...authorization,
  id: {
    in: ['params'],
    isInt: true,
    toInt: true,
    trim: true,
    errorMessage: countryIdParam
  }
};
