const { objectToSnakeCase } = require('../utils/objects');
const { omit } = require('../utils/lodash');

exports.paginateResponse = ({ data, count, page, limit }) => ({
  data: data.map(obj => objectToSnakeCase(omit(obj.dataValues, ['password']))),
  total_count: count,
  total_pages: Math.ceil(count / limit),
  page,
  limit
});
