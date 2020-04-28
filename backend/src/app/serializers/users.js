const { objectToSnakeCase } = require('../utils/objects');
const { omit } = require('../utils/lodash');

exports.getUserSerializer = user => ({
  ...objectToSnakeCase(omit(user.dataValues, ['password'])),
  lists: user.lists.map(list => objectToSnakeCase(list.dataValues))
});
