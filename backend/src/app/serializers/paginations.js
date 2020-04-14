const { objectToSnakeCase } = require('../utils/objects');

exports.paginateResponse = ({ data, count, page, limit }) => ({
  data: data.map(objectToSnakeCase),
  total_count: count,
  total_pages: Math.ceil(count / limit),
  page,
  limit
});
