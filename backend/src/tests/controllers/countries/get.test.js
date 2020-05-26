/* eslint-disable max-lines */
const {
  mockSuccessLatestCountry,
  mockFailCovid,
  mockSuccessEmptyLatestCountry
} = require('../../mocks/covid');
const { getResponse, truncateDatabase } = require('../../utils/app');
const { createManyCountries, createCountry } = require('../../factories/countries');
const { createUser } = require('../../factories/users');
const { generateToken } = require('../../factories/tokens');
const { getPaginationData, expectedPaginationKeys } = require('../../utils/paginations');
const { createList } = require('../../factories/lists');
const { createCountryByList } = require('../../factories/country_by_list');
const {
  USER_ROLES: { ADMIN }
} = require('../.././../app/utils/constants');

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
const countFakeCountries = 15;
const countTestCountries = 15;
const expectedPaginationWithFilter = getPaginationData({ total: countTestCountries });
const expectedPaginationNoFilters = getPaginationData({
  total: countFakeCountries + countTestCountries
});

describe('GET /countries', () => {
  let successResponseFiltered = {};
  let successResponseWithoutFilters = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    await createUser();
    await createManyCountries({ quantity: countFakeCountries, country: { name: 'fake' } });
    await createManyCountries({
      quantity: countTestCountries,
      country: { name: 'tests', iso2: 'iso2', iso3: 'iso3' }
    });
    successResponseFiltered = await getResponse({
      endpoint: '/countries',
      method: 'get',
      headers: { Authorization: token },
      query: {
        name: 'test',
        isocode2: 'iso',
        isocode3: 'iso',
        page: expectedPaginationWithFilter.page,
        limit: expectedPaginationWithFilter.limit,
        order_column: 'id'
      }
    });
    successResponseWithoutFilters = await getResponse({
      endpoint: '/countries',
      method: 'get',
      headers: { Authorization: token }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/countries',
      method: 'get',
      query: { limit: 'name', page: 'forty', order_column: 'delivery_name', order_type: 'ascendent' }
    });
  });
  describe('Successful response with filter', () => {
    it('Should return status code 200', () => {
      expect(successResponseFiltered.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(
        Object.keys(successResponseFiltered.body).every(key => expectedPaginationKeys.includes(key))
      ).toBe(true);
    });
    it(`Should return total count ${expectedPaginationWithFilter.totalCount}`, () => {
      expect(successResponseFiltered.body.total_count).toBe(expectedPaginationWithFilter.totalCount);
    });
    it(`Should return total pages ${expectedPaginationWithFilter.totalPages}`, () => {
      expect(successResponseFiltered.body.total_pages).toBe(expectedPaginationWithFilter.totalPages);
    });
    it(`Should return page ${expectedPaginationWithFilter.page}`, () => {
      expect(successResponseFiltered.body.page).toBe(expectedPaginationWithFilter.page);
    });
    it(`Should return limit ${expectedPaginationWithFilter.limit}`, () => {
      expect(successResponseFiltered.body.limit).toBe(expectedPaginationWithFilter.limit);
    });
    it(`Should return ${countTestCountries} results`, () => {
      expect(successResponseFiltered.body.data.length).toBe(countTestCountries);
    });
    it('Should return the correct keys in each country', () => {
      successResponseFiltered.body.data.forEach(country => {
        expect(Object.keys(country).every(key => expectedCountriesKeys.includes(key))).toBe(true);
      });
    });
    it('Every country must contains the string "test"', () => {
      successResponseFiltered.body.data.forEach(({ name }) => {
        expect(name.includes('test')).toBe(true);
      });
    });
  });
  describe('Successful response with filter', () => {
    it('Should return status code 200', () => {
      expect(successResponseWithoutFilters.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(
        Object.keys(successResponseWithoutFilters.body).every(key => expectedPaginationKeys.includes(key))
      ).toBe(true);
    });
    it(`Should return total count ${expectedPaginationNoFilters.totalCount}`, () => {
      expect(successResponseWithoutFilters.body.total_count).toBe(expectedPaginationNoFilters.totalCount);
    });
    it(`Should return total pages ${expectedPaginationNoFilters.totalPages}`, () => {
      expect(successResponseWithoutFilters.body.total_pages).toBe(expectedPaginationNoFilters.totalPages);
    });
    it(`Should return page ${expectedPaginationNoFilters.page}`, () => {
      expect(successResponseWithoutFilters.body.page).toBe(expectedPaginationNoFilters.page);
    });
    it(`Should return limit ${expectedPaginationNoFilters.limit}`, () => {
      expect(parseInt(successResponseWithoutFilters.body.limit)).toBe(expectedPaginationNoFilters.limit);
    });
    it(`Should return ${expectedPaginationNoFilters.limit} results`, () => {
      expect(successResponseWithoutFilters.body.data.length).toBe(expectedPaginationNoFilters.limit);
    });
    it('Should return the correct keys in each country', () => {
      successResponseWithoutFilters.body.data.forEach(country => {
        expect(Object.keys(country).every(key => expectedCountriesKeys.includes(key))).toBe(true);
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

describe('GET /countries/:id/latest', () => {
  let successResponse = {};
  let successEmptyResponse = {};
  let failCovidResponse = {};
  let countryNotFoundResponse = {};
  const expectedLatestKeys = ['confirmed', 'deaths', 'recovered'];
  const totalCountries = 2;
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    const { id: listId } = await createList({ userId });
    const [{ id: firstCountryId }] = await createManyCountries({
      quantity: totalCountries
    });
    await createCountryByList({ listId, countryId: firstCountryId });
    mockSuccessLatestCountry();
    successResponse = await getResponse({
      endpoint: `/countries/${firstCountryId}/latest`,
      method: 'get',
      headers: { Authorization: token }
    });
    mockSuccessEmptyLatestCountry();
    successEmptyResponse = await getResponse({
      endpoint: `/countries/${firstCountryId}/latest`,
      method: 'get',
      headers: { Authorization: token }
    });
    mockFailCovid();
    failCovidResponse = await getResponse({
      endpoint: `/countries/${firstCountryId}/latest`,
      method: 'get',
      headers: { Authorization: token }
    });
    countryNotFoundResponse = await getResponse({
      endpoint: '/countries/2/latest',
      method: 'get',
      headers: { Authorization: token }
    });
  });
  describe('Successful response', () => {
    it('Should return status code 200', () => {
      expect(successResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successResponse.body)).toStrictEqual(expect.arrayContaining(expectedLatestKeys));
    });
  });
  describe('Successful empty response', () => {
    it('Should return status code 200', () => {
      expect(successEmptyResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successEmptyResponse.body)).toStrictEqual(
        expect.arrayContaining(expectedLatestKeys)
      );
    });
    it('Should return the correct values in body', () => {
      expect(Object.values(successEmptyResponse.body)).toStrictEqual(expect.arrayContaining([0, 0, 0]));
    });
  });
  describe('Fail for covid error', () => {
    it('Should return status code 503', () => {
      expect(failCovidResponse.statusCode).toEqual(503);
    });
    it('Should return internal_code external_service_error', () => {
      expect(failCovidResponse.body.internal_code).toBe('external_service_error');
    });
    it('Should return an error indicating there was an error getting latest results', () => {
      expect(failCovidResponse.body.message).toBe(
        'There was an error getting the latest results, reason: Default error covid api'
      );
    });
  });
  describe('Fail to get latest because the country is not contained in your lists', () => {
    it('Should return status code 404', () => {
      expect(countryNotFoundResponse.statusCode).toEqual(404);
    });
    it('Should return internal_code not_found', () => {
      expect(countryNotFoundResponse.body.internal_code).toBe('not_found');
    });
    it('Should return message "List not found"', () => {
      expect(countryNotFoundResponse.body.message).toBe('Country not found');
    });
  });
});

describe('GET /countries/:id/interested_users', () => {
  const expectedInterestedUsersKeys = ['amount'];
  let successResponse = {};
  let countryNotFoundResponse = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    await createUser({ type: ADMIN });
    const { id: userId } = await createUser();
    const { id: listId } = await createList({ userId });
    const { id: countryId } = await createCountry();
    await createCountryByList({ listId, countryId });
    successResponse = await getResponse({
      endpoint: `/countries/${countryId}/interested_users`,
      method: 'get',
      headers: { Authorization: token }
    });
    countryNotFoundResponse = await getResponse({
      endpoint: '/countries/78943/interested_users',
      method: 'get',
      headers: { Authorization: token }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/countries/wrong_id/interested_users',
      method: 'get'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 200', () => {
      expect(successResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      expect(Object.keys(successResponse.body)).toStrictEqual(
        expect.arrayContaining(expectedInterestedUsersKeys)
      );
    });
    it('Should return the correct amount', () => {
      expect(successResponse.body.amount).toBe(1);
    });
  });
  describe('Fail for country not found', () => {
    it('Should return status code 404', () => {
      expect(countryNotFoundResponse.statusCode).toEqual(404);
    });
    it('Should return internal_code not_found', () => {
      expect(countryNotFoundResponse.body.internal_code).toBe('not_found');
    });
    it('Should return message "Country not found"', () => {
      expect(countryNotFoundResponse.body.message).toBe('The provided country was not found');
    });
  });
  describe('Fail for invalid request', () => {
    it('Should return status code 400', () => {
      expect(invalidParamsResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_params', () => {
      expect(invalidParamsResponse.body.internal_code).toBe('invalid_params');
    });
    it('Should return an error indicating the provided country id is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('country id must be an integer and be contained in path')
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
