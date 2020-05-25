/* eslint-disable max-lines */

const { getResponse, truncateDatabase } = require('../../utils/app');
const { createCountry } = require('../../factories/countries');
const { createUser } = require('../../factories/users');
const { generateToken } = require('../../factories/tokens');
const { getPaginationData } = require('../../utils/paginations');

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
const countCountries = 3;

describe('GET /countries/closer', () => {
  const expectedPagination = getPaginationData({ total: countCountries });
  let successResponse = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    await truncateDatabase();
    const token = await generateToken();
    await createUser();
    await createCountry({ name: 'Honduras', latitude: '15', longitude: '-86.5' });
    await createCountry({ name: 'Korea', latitude: '37', longitude: '127.5' });
    await createCountry({ name: 'Liberia', latitude: '6.5', longitude: '-9.5' });
    await createCountry({ name: 'Paraguay', latitude: '-23', longitude: '-58' });
    await createCountry({ name: 'Argentina', latitude: '-34', longitude: '-64' });
    await createCountry({ name: 'Brazil', latitude: '-10', longitude: '-55' });
    await createCountry({ name: 'France', latitude: '46', longitude: '2' });
    await createCountry({ name: 'Japan', latitude: '36', longitude: '138' });
    successResponse = await getResponse({
      endpoint: '/countries/closer',
      method: 'get',
      headers: { Authorization: token },
      query: {
        page: expectedPagination.page,
        limit: expectedPagination.limit,
        latitude: '44',
        longitude: '5'
      }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/countries/closer',
      method: 'get',
      query: { latitude: 'name', longitude: 'forty' }
    });
  });
  describe('Successful response with filter', () => {
    it('Should return status code 200', () => {
      expect(successResponse.statusCode).toEqual(200);
    });
    it(`Should return ${countCountries} results`, () => {
      expect(successResponse.body.data.length).toBe(countCountries);
    });
    it('Should return the correct keys in each country', () => {
      successResponse.body.data.forEach(country => {
        expect(Object.keys(country)).toStrictEqual(expect.arrayContaining(expectedCountriesKeys));
      });
    });
    it('Should return France as first country', () => {
      expect(successResponse.body.data[0].name).toEqual('France');
    });
  });
  describe('Fail for invalid request', () => {
    it('Should return status code 400', () => {
      expect(invalidParamsResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_params', () => {
      expect(invalidParamsResponse.body.internal_code).toBe('invalid_params');
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
