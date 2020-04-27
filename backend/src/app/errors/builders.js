const {
  NOT_FOUND,
  INVALID_PARAMS,
  EMPTY_BODY,
  DATABASE_ERROR,
  ALREADY_EXIST,
  INVALID_TOKEN,
  EXTERNAL_SERVICE_ERROR,
  INVALID_COUNTRIES,
  INVALID_CREDENTIALS,
  DEPENDENCY_ERROR
} = require('./internal_codes');

const buildError = (message, internalCode) => ({
  message,
  internalCode
});

exports.notFound = message => buildError(message, NOT_FOUND);
exports.invalidParams = arrayErrors => buildError(arrayErrors, INVALID_PARAMS);
exports.nonEmptyBody = buildError("The body mustn't be empty", EMPTY_BODY);
exports.databaseError = message => buildError(message, DATABASE_ERROR);
exports.alreadyExist = message => buildError(message, ALREADY_EXIST);
exports.invalidToken = message => buildError(message, INVALID_TOKEN);
exports.externalService = message => buildError(message, EXTERNAL_SERVICE_ERROR);
exports.invalidCountries = () => buildError('The provided countries are invalid', INVALID_COUNTRIES);
exports.invalidCredentials = () => buildError('The credentials are not correct', INVALID_CREDENTIALS);
exports.dependencyError = message =>
  buildError(`There was a problem with one of our dependencies, reason: ${message}`, DEPENDENCY_ERROR);
