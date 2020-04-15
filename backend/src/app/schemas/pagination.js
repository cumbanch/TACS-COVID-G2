const { getModelKeys } = require('../utils/models');
const { limit, orderColumn, orderType, page } = require('../errors/schema_messages');

module.exports = model => ({
  limit: {
    in: ['query'],
    isInt: {
      options: { min: 1 }
    },
    toInt: true,
    optional: true,
    trim: true,
    errorMessage: limit
  },
  page: {
    in: ['query'],
    isInt: {
      options: { min: 1 }
    },
    toInt: true,
    optional: true,
    trim: true,
    errorMessage: page
  },
  order_column: {
    in: ['query'],
    isString: true,
    optional: true,
    trim: true,
    custom: {
      options: value => getModelKeys(model).includes(value.toLowerCase())
    },
    errorMessage: orderColumn
  },
  order_type: {
    in: ['query'],
    isString: true,
    optional: true,
    trim: true,
    custom: { options: value => ['ASC', 'DESC'].includes(value && value.toUpperCase()) },
    errorMessage: orderType
  }
});
