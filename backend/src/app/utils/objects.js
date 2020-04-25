const { isObject, snakeCase, camelCase } = require('./lodash');

const changeCaseObject = ({ originalObject, caseFunction, nestedCaseFunction }) => {
  const newObject = {};
  Object.entries(originalObject).forEach(([key, value]) => {
    newObject[caseFunction(key)] = value;
  });
  return newObject;
};

exports.objectToSnakeCase = camelCaseObject =>
  changeCaseObject({
    originalObject: camelCaseObject,
    caseFunction: snakeCase,
    nestedCaseFunction: exports.objectToSnakeCase
  });

exports.deleteUndefined = attrs => {
  const newAttrs = { ...attrs };
  Object.keys(newAttrs).forEach(key => newAttrs[key] === undefined && delete newAttrs[key]);
  return newAttrs;
};
