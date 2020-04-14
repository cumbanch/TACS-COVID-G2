const { snakeCase } = require('./lodash');

exports.getModelKeys = model => {
  const columns = Object.keys(model.tableAttributes).map(each => snakeCase(each));
  return columns;
};
