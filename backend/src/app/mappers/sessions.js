const { externalProviderNameHeaderName, externalTokenHeaderName } = require('../../config').session;

exports.externalLoginMapper = ({ headers }) => ({
  accessToken: headers[externalTokenHeaderName],
  providerName: headers[externalProviderNameHeaderName]
});
