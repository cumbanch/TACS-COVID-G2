const pagination = require('./pagination');
const authorization = require('./authorizations');
const { isocode2, isocode3, countryName } = require('../errors/schema_messages');

exports.getCountriesSchema = {
  ...authorization,
  ...pagination,
  name: {
    in: ['query'],
    isString: true,
    trim: true,
    errorMessage: countryName
  },
  isocode2: { in: ['query'], isString: true, trim: true, errorMessage: isocode2 },
  isocode3: { in: ['query'], isString: true, trim: true, errorMessage: isocode3 }
};
