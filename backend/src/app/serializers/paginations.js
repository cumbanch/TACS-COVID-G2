const { objectToSnakeCase } = require('../utils/objects');
const { isArray } = require('../utils/lodash');

exports.paginateResponse = ({ data, count, page, limit }) => ({
  data: data.map(obj => objectToSnakeCase(obj.dataValues)),
  total_count: count,
  total_pages: Math.ceil(count / limit),
  page,
  limit
});
