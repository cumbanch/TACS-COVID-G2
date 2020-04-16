const { isObject, snakeCase, camelCase } = require('./lodash');

const changeCaseObject = ({ originalObject, caseFunction, nestedCaseFunction }) => {
  const newObject = {};
  Object.entries(originalObject).forEach(([key, value]) => {
    if (isObject(value) && Object.keys(value).length) {
      newObject[caseFunction(key)] = value.length
        ? value.map(exports.objectToSnakeCase)
        : nestedCaseFunction(value.dataValues);
    } else {
      newObject[caseFunction(key)] = value;
    }
  });
  return newObject;
};

exports.objectToCamelCase = snakeCaseObject =>
  changeCaseObject({
    originalObject: snakeCaseObject,
    caseFunction: camelCase,
    nestedCaseFunction: exports.objectToCamelCase
  });

exports.objectToSnakeCase = camelCaseObject =>
  changeCaseObject({
    originalObject: camelCaseObject,
    caseFunction: snakeCase,
    nestedCaseFunction: exports.objectToSnakeCase
  });
