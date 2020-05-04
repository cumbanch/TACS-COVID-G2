const {
  NOT_FOUND,
  INVALID_PARAMS,
  EMPTY_BODY,
  EMPTY_LIST,
  DATABASE_ERROR,
  ALREADY_EXIST,
  INVALID_TOKEN,
  EXTERNAL_SERVICE_ERROR,
  INVALID_COUNTRIES,
  INVALID_COUNTRY,
  INVALID_LIST,
  INVALID_CREDENTIALS,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED
} = require('./internal_codes');

const buildError = (message, internalCode) => ({
  message,
  internalCode
});

exports.notFound = message => buildError(message, NOT_FOUND);
exports.invalidParams = arrayErrors => buildError(arrayErrors, INVALID_PARAMS);
exports.nonEmptyBody = buildError("The body mustn't be empty", EMPTY_BODY);
exports.emptyList = message => buildError(message, EMPTY_LIST);
exports.databaseError = message => buildError(message, DATABASE_ERROR);
exports.alreadyExist = message => buildError(message, ALREADY_EXIST);
exports.invalidToken = message => buildError(message, INVALID_TOKEN);
exports.externalService = message => buildError(message, EXTERNAL_SERVICE_ERROR);
exports.invalidList = () => buildError('The provided list is invalid', INVALID_LIST);
exports.invalidCountry = () => buildError('The provided country is invalid', INVALID_COUNTRY);
exports.invalidCountries = () => buildError('The provided countries are invalid', INVALID_COUNTRIES);
exports.invalidCredentials = () => buildError('The credentials are not correct', INVALID_CREDENTIALS);
exports.internalServerError = message =>
  buildError(`There was an unexpected error, reason: ${message}`, INTERNAL_SERVER_ERROR);
exports.unauthorized = () =>
  buildError('The provided user is not authorized to access the resource', UNAUTHORIZED);
