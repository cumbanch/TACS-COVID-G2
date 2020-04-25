const { getResponse, truncateDatabase } = require('../../utils/app');
const { createManyUsers, createUser } = require('../../factories/users');
const { generateToken } = require('../../factories/tokens');
const { orderBy, omit } = require('../../../app/utils/lodash');
const { objectToSnakeCase } = require('../../../app/utils/objects');
const { getPaginationData, expectedPaginationKeys } = require('../../utils/paginations');

const expectedUserKeys = [
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
  'last_access',
  'admin',
  'name',
  'last_name',
  'email',
  'password'
];
const totalUsers = 24;
const limit = 4;
const page = 3;
const orderColumn = 'name';
const orderType = 'asc';
const expectedPaginationWithoutParams = getPaginationData({ total: totalUsers });
const expectedPaginationWithParams = getPaginationData({ total: totalUsers, limit, page });

describe('GET /users', () => {
  let successfulResponse = {};
  let successWithPaginationResponse = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    await createManyUsers({ quantity: totalUsers });
    successfulResponse = await getResponse({
      endpoint: '/users',
      method: 'get',
      headers: { Authorization: token }
    });
    successWithPaginationResponse = await getResponse({
      endpoint: '/users',
      method: 'get',
      headers: { Authorization: token },
      query: { limit, page, order_column: orderColumn, order_type: orderType }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/users',
      method: 'get',
      query: { limit: 'name', page: 'forty', order_column: 'delivery_name', order_type: 'ascendent' }
    });
  });
  describe('Successful response', () => {
    it('Should return status code 200', () => {
      expect(successfulResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successfulResponse.body).every(key => expectedPaginationKeys.includes(key))).toBe(
        true
      );
    });
    it(`Should return total count ${totalUsers}`, () => {
      expect(successfulResponse.body.total_count).toBe(totalUsers);
    });
    it(`Should return total pages ${expectedPaginationWithoutParams.totalPages}`, () => {
      expect(successfulResponse.body.total_pages).toBe(expectedPaginationWithoutParams.totalPages);
    });
    it(`Should return page ${expectedPaginationWithoutParams.page}`, () => {
      expect(successfulResponse.body.page).toBe(expectedPaginationWithoutParams.page);
    });
    it(`Should return limit ${expectedPaginationWithoutParams.limit}`, () => {
      expect(parseInt(successfulResponse.body.limit)).toBe(expectedPaginationWithoutParams.limit);
    });
    it(`Should return ${expectedPaginationWithoutParams.limit} results`, () => {
      expect(successfulResponse.body.data.length).toBe(expectedPaginationWithoutParams.limit);
    });
    it('Should return the correct keys in each user', () => {
      successfulResponse.body.data.forEach(user => {
        expect(Object.keys(user).every(key => expectedUserKeys.includes(key))).toBe(true);
      });
    });
  });
  describe('Successful response with pagination', () => {
    it('Should return status code 200', () => {
      expect(successWithPaginationResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(
        Object.keys(successWithPaginationResponse.body).every(key => expectedPaginationKeys.includes(key))
      ).toBe(true);
    });
    it(`Should return total count ${expectedPaginationWithParams.totalCount}`, () => {
      expect(successWithPaginationResponse.body.total_count).toBe(expectedPaginationWithParams.totalCount);
    });
    it(`Should return total pages ${expectedPaginationWithParams.totalPages}`, () => {
      expect(successWithPaginationResponse.body.total_pages).toBe(expectedPaginationWithParams.totalPages);
    });
    it(`Should return page ${expectedPaginationWithParams.page}`, () => {
      expect(successWithPaginationResponse.body.page).toBe(expectedPaginationWithParams.page);
    });
    it(`Should return limit ${expectedPaginationWithParams.limit}`, () => {
      expect(successWithPaginationResponse.body.limit).toBe(expectedPaginationWithParams.limit);
    });
    it(`Should return ${expectedPaginationWithParams.limit} results`, () => {
      expect(successWithPaginationResponse.body.data.length).toBe(expectedPaginationWithParams.limit);
    });
    it(`Should return a results ordered by ${orderColumn} ${orderType}`, () => {
      const lodashOrder = orderBy(successWithPaginationResponse.body.data, orderColumn, orderType);
      expect(successWithPaginationResponse.body.data).toEqual(lodashOrder);
    });
    it('Should return the correct keys in each user', () => {
      successWithPaginationResponse.body.data.forEach(user => {
        expect(Object.keys(user).every(key => expectedUserKeys.includes(key))).toBe(true);
      });
    });
  });
  describe('Fail for invalid request', () => {
    it('Should return status code 400', () => {
      expect(invalidParamsResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_params', () => {
      expect(invalidParamsResponse.body.internal_code).toBe('invalid_params');
    });
    it('Should return an error indicating the provider order_type is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('order_type must be asc o desc and be contained in query')
      ).toBe(true);
    });
    it('Should return an error indicating the provider order_column is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'order_column must be a valid column and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provider page is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'page must be an integer, be greater than zero and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provider limit is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'limit must be an integer, be greater than zero and be contained in query'
        )
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

describe('GET /users/:id', () => {
  let successfulResponse = {};
  let userNotFoundResponse = {};
  let invalidParamsResponse = {};
  let userCreated = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    userCreated = await createUser();
    successfulResponse = await getResponse({
      endpoint: `/users/${userCreated.id}`,
      method: 'get',
      headers: { Authorization: token }
    });
    userNotFoundResponse = await getResponse({
      endpoint: '/users/13',
      method: 'get',
      headers: { Authorization: token }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/users/wrongId',
      method: 'get'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 200', () => {
      expect(successfulResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successfulResponse.body).every(key => expectedUserKeys.includes(key))).toBe(true);
    });
    it('Should return the user created', () => {
      expect(
        omit(successfulResponse.body, ['created_at', 'updated_at', 'deleted_at', 'last_access'])
      ).toMatchObject(
        omit(objectToSnakeCase(userCreated.dataValues), [
          'created_at',
          'updated_at',
          'deleted_at',
          'last_access'
        ])
      );
    });
  });
  describe('Fail for user not found', () => {
    it('Should return status code 404', () => {
      expect(userNotFoundResponse.statusCode).toEqual(404);
    });
    it('Should return internal_code not_found', () => {
      expect(userNotFoundResponse.body.internal_code).toBe('not_found');
    });
    it('Should return message "User not found"', () => {
      expect(userNotFoundResponse.body.message).toBe('User not found');
    });
  });
  describe('Fail for invalid params', () => {
    it('Should return status code 400', () => {
      expect(invalidParamsResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_params', () => {
      expect(invalidParamsResponse.body.internal_code).toBe('invalid_params');
    });
    it('Should return an error indicating the provider user id is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('user id must be an integer and be contained in path')
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
