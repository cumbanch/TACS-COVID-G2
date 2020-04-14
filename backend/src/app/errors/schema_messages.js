const integerMessage = field => `${field} must be an integer`;
const stringMessage = field => `${field} must be a string`;
const tokenMessage = field => `${field} must be a jwt token`;
const containedMessage = location => `and contained in ${location}`;

exports.authorization = 'Authorization must be a jwt token and must contained in headers';
exports.orderType = `order_type must be asc o desc ${containedMessage('query')}`;
exports.orderColumn = `order_column must be a valid column ${containedMessage('query')}`;
exports.page = `${integerMessage('page')}, be greater than zero ${containedMessage('query')}`;
exports.limit = `${integerMessage('limit')}, be greater than zero ${containedMessage('query')}`;
exports.userId = `${integerMessage('id')} ${containedMessage('path')}`;
exports.userName = `${stringMessage('name')} ${containedMessage('body')}`;
exports.password = `${stringMessage('password')}, be a hash ${containedMessage('body')}`;
exports.email = `${stringMessage('email')} ${containedMessage('body')}`;
exports.refreshToken = `${tokenMessage('refresh_token')} ${containedMessage('body')}`;

// const { SUPPORTED_PROVIDER_TYPES, SUPPORTED_ORDERS } = require('../utils/constant');

// module.exports = {
//   CONTRACT_NUMBER: { code: '0001', message: 'contract_number must be a string' },
//   DOCUMENT_NUMBER: { code: '0002', message: 'document_number must be a string' },
//   FIRST_NAME: { code: '0003', message: 'first_name must be a string' },
//   LAST_NAME: { code: '0004', message: 'last_name must be a string' },
//   EMAIL: { code: '0005', message: 'email must be a string' },
//   PROVIDER_ID: { code: '0006', message: 'provider id must be an integer' },
//   LIMIT: { code: '0007', message: 'limit must be an integer and be greater than zero' },
//   PAGE: { code: '0008', message: 'page must be an integer and be greater than zero' },
//   ORDER_COLUMN: { code: '0009', message: 'order_column must be a string referencing an appropiate field' },
//   ORDER_TYPE: { code: '0010', message: `order_type must be either ${SUPPORTED_ORDERS}` },
//   EMAIL_VALID: { code: '0011', message: 'email must be a valid email' },
//   NICK_NAME: { code: '0012', message: 'nick_name must be a string' },
//   PHONE_NUMBER: { code: '0013', message: 'phone_number must be a string' },
//   ADDRESS: { code: '0014', message: 'address must be a string' },
//   PASSWORD: { code: '0015', message: 'password must be a string and contain at least 8 characters' },
//   USER_ID: { code: '0016', message: 'user id must be an integer' },
//   BIRTH_DATE: { code: '0017', message: 'birth_date must be a ISO8601 timestamp' },
//   DOCUMENT_TYPE: { code: '0018', message: 'document_type must be a string' },
//   GENDER: { code: '0019', message: 'gender must be a string equal to "M" or "F"' },
//   UID: { code: '0020', message: 'uid must be present in headers and contain a valid email' },
//   BACK_DELETE_PROVIDERS_ID: {
//     code: '0026',
//     message: 'must send valid providers id in body to delete providers'
//   },
//   SPECIALTY_NAME: { code: '0021', message: 'specialty_name must be a string' },
//   DELETE_USERS_ID: { code: '0025', message: 'must send valid users id in body to delete users' },
//   DATETIME: { code: '0031', message: 'datetime must be a valid date' },
//   TYPE: { code: '0022', message: `type filter must be a string and one of to ${SUPPORTED_PROVIDER_TYPES}` },
//   MONTH: { code: '0024', message: 'month must be an integer between 1 and 12' },
//   INTERNAL_CODE: { code: '0027', message: 'internal_code must be a string' },
//   DURATION: { code: '0028', message: 'duration must be an integer and represent a value in minutes' },
//   APPOINTMENT_DATE: { code: '0029', message: 'appointment_date must be a ISO8601 timestamp' },
//   AVAILABILITY_ID: { code: '0030', message: 'availability_id must be a string' },
//   AGENT_APPOINTMENT_ID: { code: '0036', message: 'appointment id must be integer and must be exist in path' },
//   BUS_APPOINTMENT_ID: { code: '0033', message: 'appointment id must be a token and must be exist in path' },
//   ONLINE_APPOINTMENT: { code: '0032', message: 'online_appointment must be a boolean' },
//   STATUS: { code: '0037', message: 'status must be a string' },
//   APPOINTMENT_ID: { code: '0038', message: 'appointment id must be an integer' },
//   PROVIDER_CODE_APPOINTMENT: {
//     code: '0039',
//     message: 'provider_code must be a string and must be exist in query'
//   },
//   TOKEN_APPOINTMENT: {
//     code: '0040',
//     message: 'the token from appointment must be a string and must be exist in the path'
//   },
//   PROVIDER_CODE: { code: '0041', message: 'provider_code must be a string' },
//   DATE_FROM: { code: '0035', message: 'date_from must be a valid date and respect the iso 8601' },
//   EXTERNAL_CODE: { code: '0034', message: 'external_code must be a string' },
//   CALENDAR_TOKEN: { code: '0045', message: 'calendar_token must be a string' },
//   WEB_URL: { code: '0046', message: 'web_url should be a string' },
//   NEIGHBORHOOD: { code: '0047', message: 'neighborhood should be a string' },
//   DEPARTMENT: { code: '0048', message: 'department should be a string' },
//   ZONE: { code: '0049', message: 'zone should be a string' },
//   LATITUDE: { code: '0050', message: 'latitude should be a string' },
//   LONGITUDE: { code: '0051', message: 'longitude should be a string' },
//   CUIL: { code: '0052', message: 'cuil should be a string' },
//   PARENT_ID: { code: '0053', message: 'parent_id should be an integer' },
//   FILIAL: { code: '0054', message: 'filial should be an integer' },
//   NUMBER: { code: '0055', message: 'number should be an integer' },
//   MEDICAL_CENTER: { code: '0056', message: 'medical_center should be an integer' },
//   SEQUENCE: { code: '0057', message: 'sequence should be an integer' },
//   DENOMINATION: { code: '0068', message: 'denomintaion should be an integer' },
//   SPECIALTY_ID: { code: '0069', message: 'specialty_id should be an integer' },
//   SUB_SPECIALTY_ID: { code: '0070', message: 'sub_specialty_id should be an integer' },
//   CREDENTIAL_NUMBER: { code: '0042', message: 'credential_number must be a string' },
//   CREDENTIAL_EXPIRATION_DATE: { code: '0043', message: 'credential_expiration_date must be a date' },
//   SECURITY_CODE: { code: '0044', message: 'security_code must be a string' },
//   PLAN_ID: { code: '0071', message: 'plan_id must be a string' },
//   CELL_PHONE: { code: '0049', message: 'cell_phone must be a string' },
//   FIREBASE_TOKEN: { code: '0072', message: 'firebase_token must be a string' },
//   AUTHORIZATION: { code: '0073', message: 'Authorization should be a string present in headers' },
//   DEVICE_DATE: { code: '0074', message: 'device_date must be present and must be isISO8601' },
//   TAX_STATUS: { code: '0075', message: 'tax_status must be a string' }
// };
