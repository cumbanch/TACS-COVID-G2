const {
  NOT_FOUND,
  INVALID_PARAMS,
  NON_EMPTY_BODY,
  DATABASE_ERROR,
  ALREADY_EXIST,
  INVALID_TOKEN,
  EXTERNAL_SERVICE_ERROR,
  INVALID_COUNTRIES
} = require('./internal_codes');

const buildError = (message, internalCode) => ({
  message,
  internalCode
});

exports.notFound = message => buildError(message, NOT_FOUND);
exports.invalidParams = arrayErrors => buildError(arrayErrors, INVALID_PARAMS);
exports.nonEmptyBody = buildError("The body musn't be empty", NON_EMPTY_BODY);
exports.databaseError = message => buildError(message, DATABASE_ERROR);
exports.alreadyExist = message => buildError(message, ALREADY_EXIST);
exports.invalidToken = message => buildError(message, INVALID_TOKEN);
exports.externalService = message => buildError(message, EXTERNAL_SERVICE_ERROR);
exports.invalidCountries = () => buildError('The provided countries are invalid', INVALID_COUNTRIES);
