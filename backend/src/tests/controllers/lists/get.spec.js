const { getResponse, truncateDatabase } = require('../../utils/app');
const { createManyLists, createList } = require('../../factories/lists');
const { createManyCountries } = require('../../factories/countries');
const { createCountryByList } = require('../../factories/country_by_list');
const { createUser } = require('../../factories/users');
const { generateToken } = require('../../factories/tokens');
const { getPaginationData, expectedPaginationKeys } = require('../../utils/paginations');

const expectedListsKeys = ['id', 'created_at', 'updated_at', 'deleted_at', 'name'];
const countList = 10;
const expectedPagination = getPaginationData({ total: countList });

describe('GET /lists', () => {
  let successResponse = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    await createManyLists({ quantity: countList, list: { userId } });
    successResponse = await getResponse({
      endpoint: '/lists',
      method: 'get',
      headers: { Authorization: token },
      query: {
        page: expectedPagination.page,
        limit: expectedPagination.limit
      }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists',
      method: 'get',
      query: { limit: 'name', page: 'forty', order_column: 'delivery_name', order_type: 'ascendent' }
    });
  });
  describe('Successful response with filter', () => {
    it('Should return status code 200', () => {
      expect(successResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successResponse.body).every(key => expectedPaginationKeys.includes(key))).toBe(true);
    });
    it(`Should return total count ${expectedPagination.totalCount}`, () => {
      expect(successResponse.body.total_count).toBe(expectedPagination.totalCount);
    });
    it(`Should return total pages ${expectedPagination.totalPages}`, () => {
      expect(successResponse.body.total_pages).toBe(expectedPagination.totalPages);
    });
    it(`Should return page ${expectedPagination.page}`, () => {
      expect(successResponse.body.page).toBe(expectedPagination.page);
    });
    it(`Should return limit ${expectedPagination.limit}`, () => {
      expect(successResponse.body.limit).toBe(expectedPagination.limit);
    });
    it(`Should return ${countList} results`, () => {
      expect(successResponse.body.data.length).toBe(countList);
    });
    it('Should return the correct keys in each list', () => {
      successResponse.body.data.forEach(list => {
        expect(Object.keys(list)).toStrictEqual(expect.arrayContaining(expectedListsKeys));
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
    it('Should return an error indicating the provided order_type is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('order_type must be asc o desc and be contained in query')
      ).toBe(true);
    });
    it('Should return an error indicating the provided order_column is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'order_column must be a valid column and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided page is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'page must be an integer, be greater than zero and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided limit is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'limit must be an integer, be greater than zero and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided authorization header is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'Authorization must be a jwt token and must be contained in headers'
        )
      ).toBe(true);
    });
  });
});

describe('GET /lists', () => {
  let successResponse = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    await createManyLists({ quantity: countList, list: { userId } });
    successResponse = await getResponse({
      endpoint: '/lists',
      method: 'get',
      headers: { Authorization: token },
      query: {
        page: expectedPagination.page,
        limit: expectedPagination.limit
      }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists',
      method: 'get',
      query: { limit: 'name', page: 'forty', order_column: 'delivery_name', order_type: 'ascendent' }
    });
  });
  describe('Successful response with filter', () => {
    it('Should return status code 200', () => {
      expect(successResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successResponse.body).every(key => expectedPaginationKeys.includes(key))).toBe(true);
    });
    it(`Should return total count ${expectedPagination.totalCount}`, () => {
      expect(successResponse.body.total_count).toBe(expectedPagination.totalCount);
    });
    it(`Should return total pages ${expectedPagination.totalPages}`, () => {
      expect(successResponse.body.total_pages).toBe(expectedPagination.totalPages);
    });
    it(`Should return page ${expectedPagination.page}`, () => {
      expect(successResponse.body.page).toBe(expectedPagination.page);
    });
    it(`Should return limit ${expectedPagination.limit}`, () => {
      expect(successResponse.body.limit).toBe(expectedPagination.limit);
    });
    it(`Should return ${countList} results`, () => {
      expect(successResponse.body.data.length).toBe(countList);
    });
    it('Should return the correct keys in each list', () => {
      successResponse.body.data.forEach(list => {
        expect(Object.keys(list)).toStrictEqual(expect.arrayContaining(expectedListsKeys));
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
    it('Should return an error indicating the provided order_type is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('order_type must be asc o desc and be contained in query')
      ).toBe(true);
    });
    it('Should return an error indicating the provided order_column is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'order_column must be a valid column and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided page is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'page must be an integer, be greater than zero and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided limit is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'limit must be an integer, be greater than zero and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided authorization header is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'Authorization must be a jwt token and must be contained in headers'
        )
      ).toBe(true);
    });
  });
});

describe('GET /lists/:id', () => {
  let successfulResponse = {};
  let listNotFoundResponse = {};
  let invalidParamsResponse = {};
  let listCreated = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    listCreated = await createList({ userId });
    successfulResponse = await getResponse({
      endpoint: `/lists/${listCreated.id}`,
      method: 'get',
      headers: { Authorization: token }
    });
    listNotFoundResponse = await getResponse({
      endpoint: '/lists/13',
      method: 'get',
      headers: { Authorization: token }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/wrongId',
      method: 'get'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 200', () => {
      expect(successfulResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successfulResponse.body)).toStrictEqual(expect.arrayContaining(expectedListsKeys));
    });
    it('Should return the list created', () => {
      expect({ id: successfulResponse.body.id, name: successfulResponse.body.name }).toMatchObject({
        id: listCreated.id,
        name: listCreated.name
      });
    });
  });
  describe('Fail for list not found', () => {
    it('Should return status code 404', () => {
      expect(listNotFoundResponse.statusCode).toEqual(404);
    });
    it('Should return internal_code not_found', () => {
      expect(listNotFoundResponse.body.internal_code).toBe('not_found');
    });
    it('Should return message "List not found"', () => {
      expect(listNotFoundResponse.body.message).toBe('List not found');
    });
  });
  describe('Fail for invalid params', () => {
    it('Should return status code 400', () => {
      expect(invalidParamsResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_params', () => {
      expect(invalidParamsResponse.body.internal_code).toBe('invalid_params');
    });
    it('Should return an error indicating the provided list id is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('list id must be an integer and be contained in path')
      ).toBe(true);
    });
    it('Should return an error indicating the provided authorization header is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'Authorization must be a jwt token and must be contained in headers'
        )
      ).toBe(true);
    });
  });
});

describe('GET /lists/:id/countries', () => {
  const expectedCountriesKeys = [
    'id',
    'created_at',
    'updated_at',
    'deleted_at',
    'name',
    'iso_2',
    'iso_3',
    'latitude',
    'longitude'
  ];
  const totalCountries = 3;
  const page = 1;
  const limit = 2;
  const expectedPagination = getPaginationData({ total: totalCountries, limit, page });
  let successResponse = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    const { id: listId } = await createList({ userId });
    await createManyCountries({ quantity: totalCountries });
    await createCountryByList({ listId, countryId: 1 });
    await createCountryByList({ listId, countryId: 2 });
    await createCountryByList({ listId, countryId: 3 });
    successResponse = await getResponse({
      endpoint: `/lists/${listId}/countries`,
      method: 'get',
      headers: { Authorization: token },
      query: {
        page: expectedPagination.page,
        limit: expectedPagination.limit
      }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/asda/countries',
      method: 'get',
      query: { limit: 'name', page: 'forty', order_column: 'delivery_name', order_type: 'ascendent' }
    });
  });
  describe('Successful response with filter', () => {
    it('Should return status code 200', () => {
      expect(successResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successResponse.body).every(key => expectedPaginationKeys.includes(key))).toBe(true);
    });
    it(`Should return total count ${expectedPagination.totalCount}`, () => {
      expect(successResponse.body.total_count).toBe(expectedPagination.totalCount);
    });
    it(`Should return total pages ${expectedPagination.totalPages}`, () => {
      expect(successResponse.body.total_pages).toBe(expectedPagination.totalPages);
    });
    it(`Should return page ${expectedPagination.page}`, () => {
      expect(successResponse.body.page).toBe(expectedPagination.page);
    });
    it(`Should return limit ${expectedPagination.limit}`, () => {
      expect(successResponse.body.limit).toBe(expectedPagination.limit);
    });
    it(`Should return ${limit} results`, () => {
      expect(successResponse.body.data.length).toBe(limit);
    });
    it('Should return the correct keys in each country', () => {
      successResponse.body.data.forEach(country => {
        expect(Object.keys(country)).toStrictEqual(expect.arrayContaining(expectedCountriesKeys));
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
    it('Should return an error indicating the provided order_type is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('order_type must be asc o desc and be contained in query')
      ).toBe(true);
    });
    it('Should return an error indicating the provided order_column is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'order_column must be a valid column and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided page is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'page must be an integer, be greater than zero and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided limit is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'limit must be an integer, be greater than zero and be contained in query'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided authorization header is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes(
          'Authorization must be a jwt token and must be contained in headers'
        )
      ).toBe(true);
    });
    it('Should return an error indicating the provided list id is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('list id must be an integer and be contained in path')
      ).toBe(true);
    });
  });
});
