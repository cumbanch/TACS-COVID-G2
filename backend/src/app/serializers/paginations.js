const { objectToSnakeCase } = require('../utils/objects');
const { isArray } = require('../utils/lodash');

const transformData = data => {
  if (!isArray(data)) {
    const countries = data.countries.map(country => objectToSnakeCase(country.dataValues));
    return objectToSnakeCase({ ...data.dataValues, countries });
  }
  return data.map(obj => objectToSnakeCase(obj.dataValues));
};

exports.paginateResponse = ({ data, count, page, limit }) => ({
  data: transformData(data),
  total_count: count,
  total_pages: Math.ceil(count / limit),
  page,
  limit
});
