const { getResponse, truncateDatabase } = require('../../utils/app');
const { buildUser } = require('../../factories/users');
const { User } = require('../../../app/models');
const { token } = require('../../factories/tokens');

describe('POST /users', () => {
  let successfulResponse = {};
  let usersCreated = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    await truncateDatabase();
    const {
      dataValues: { name, lastName, password, email }
    } = await buildUser();
    successfulResponse = await getResponse({
      endpoint: '/users',
      method: 'post',
      body: { name, last_name: lastName, password, email },
      headers: { Authorization: token }
    });
    usersCreated = await User.findAll();
    invalidParamsResponse = await getResponse({
      endpoint: '/users',
      method: 'post'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 201', () => {
      expect(successfulResponse.statusCode).toEqual(201);
    });
    it('Should have only one user created', () => {
      expect(usersCreated.length).toBe(1);
    });
  });
  describe('Fail for invalid request', () => {
    it('Should return status code 400', () => {
      expect(invalidParamsResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_params', () => {
      expect(invalidParamsResponse.body.internal_code).toBe('invalid_params');
    });
    it('Should return an error indicating the provider email is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('email must be a string and be contained in body')
      ).toBe(true);
    });
    it('Should return an error indicating the provider name is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('name must be a string and be contained in body')
      ).toBe(true);
    });
    it('Should return an error indicating the provider password is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'password must be a string, be a hash and be contained in body'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provider last_name is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('last_name must be a string and be contained in body')
      ).toBe(true);
    });
    it('Should return an error indicating the provider authorization header is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'Authorization must be a jwt token and must be contained in headers'
        )
      ).toBe(true);
    });
  });
});
