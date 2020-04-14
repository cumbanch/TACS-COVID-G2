const { authorization } = require('../errors/schema_messages');

module.exports = authorizationHeader = {
  Authorization: {
    in: ['headers'],
    isJWT: true,
    trim: true,
    errorMessage: authorization
  }
};
