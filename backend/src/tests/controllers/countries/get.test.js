const { getResponse, truncateDatabase } = require('../../utils/app');
const { createManyCountries } = require('../../factories/countries');
const { createUser } = require('../../factories/users');
const { generateToken } = require('../../factories/tokens');
const { getPaginationData, expectedPaginationKeys } = require('../../utils/paginations');

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
const expectedPaginationWithoutFilters = getPaginationData({
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
    it(`Should return total count ${expectedPaginationWithoutFilters.totalCount}`, () => {
      expect(successResponseWithoutFilters.body.total_count).toBe(
        expectedPaginationWithoutFilters.totalCount
      );
    });
    it(`Should return total pages ${expectedPaginationWithoutFilters.totalPages}`, () => {
      expect(successResponseWithoutFilters.body.total_pages).toBe(
        expectedPaginationWithoutFilters.totalPages
      );
    });
    it(`Should return page ${expectedPaginationWithoutFilters.page}`, () => {
      expect(successResponseWithoutFilters.body.page).toBe(expectedPaginationWithoutFilters.page);
    });
    it(`Should return limit ${expectedPaginationWithoutFilters.limit}`, () => {
      expect(successResponseWithoutFilters.body.limit).toBe(expectedPaginationWithoutFilters.limit);
    });
    it(`Should return ${expectedPaginationWithoutFilters.limit} results`, () => {
      expect(successResponseWithoutFilters.body.data.length).toBe(expectedPaginationWithoutFilters.limit);
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
