const { externalProviderNameHeaderName, externalTokenHeaderName } = require('../../config').session;
const { EXTERNAL_PROVIDERS } = require('../utils/constants');

const integerMessage = field => `${field} must be an integer`;
const stringMessage = field => `${field} must be a string`;
const tokenMessage = field => `${field} must be a jwt token`;
const dateMessage = field => `${field} must be a date`;
const arrayMessage = field => `${field} must be an array`;
const jsonMessage = field => `${field} must be a json`;
const containedMessage = location => `and be contained in ${location}`;
const jwtMessage = (field, location = 'headers') =>
  `${field} must be a jwt token and must be contained in ${location}`;

exports.authorization = jwtMessage('Authorization');
exports.orderType = `order_type must be asc o desc ${containedMessage('query')}`;
exports.orderColumn = `order_column must be a valid column ${containedMessage('query')}`;
exports.page = `${integerMessage('page')}, be greater than zero ${containedMessage('query')}`;
exports.limit = `${integerMessage('limit')}, be greater than zero ${containedMessage('query')}`;
exports.userId = `${integerMessage('user id')} ${containedMessage('path')}`;
exports.userName = `${stringMessage('name')} ${containedMessage('body')}`;
exports.password = `${stringMessage('password')}, be a hash ${containedMessage('body')}`;
exports.email = `${stringMessage('email')} ${containedMessage('body')}`;
exports.refreshToken = `${tokenMessage('refresh_token')} ${containedMessage('body')}`;
exports.listName = `${stringMessage('name')} ${containedMessage('body')}`;
exports.lastAccess = `${dateMessage('last_access')} ${containedMessage('query')}`;
exports.isocode2 = `${stringMessage('isocode2')} ${containedMessage('query')}`;
exports.isocode3 = `${stringMessage('isocode3')} ${containedMessage('query')}`;
exports.countryName = `${stringMessage('name')} ${containedMessage('query')}`;
exports.countries = `${arrayMessage('countries')} of integers`;
exports.listId = `${integerMessage('list id')} ${containedMessage('path')}`;
exports.lastDays = `${integerMessage('last_days_to_check')} ${containedMessage('query')}`;
exports.offsets = `${jsonMessage('offsets')} ${containedMessage('query')}`;
exports.countryName = `${stringMessage('country_name')} ${containedMessage('query')}`;
exports.countryId = `${integerMessage('country_id')} ${containedMessage('body')}`;
exports.lastName = `${stringMessage('last_name')} ${containedMessage('body')}`;
exports.listArray = `${arrayMessage('lists')}, contain at least 2 elements ${containedMessage('body')}`;
exports.listIdArray = `${integerMessage(
  'every list_id in lists array'
)}, be greater than zero ${containedMessage('body')}`;
exports.countryIdParam = `${integerMessage('country id')} ${containedMessage('path')}`;
exports.latitude = `${stringMessage('latitude')} ${containedMessage('body')}`;
exports.longitude = `${stringMessage('longitude')} ${containedMessage('body')}`;
exports.externalToken = `${stringMessage(externalTokenHeaderName)} ${containedMessage('headers')}`;
exports.externalProviderName = `${stringMessage(externalProviderNameHeaderName)}, one of ${Object.values(
  EXTERNAL_PROVIDERS
).join(',')} ${containedMessage('headers')}`;
