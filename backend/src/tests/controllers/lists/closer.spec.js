/* eslint-disable max-lines */
const { mockSuccessGetLatest, mockSuccessGetHistory } = require('../../mocks/covid');
const { getResponse, truncateDatabase } = require('../../utils/app');
const { createCountry } = require('../../factories/countries');
const { createUser } = require('../../factories/users');
const { generateToken } = require('../../factories/tokens');

const expectedLatestKeys = ['confirmed', 'deaths', 'recovered'];

describe('GET /lists/closer/latest', () => {
  let successResponse = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    await truncateDatabase();
    const token = await generateToken();
    await createUser();
    await createCountry({ iso2: 'H', name: 'Honduras', latitude: '15', longitude: '-86.5' });
    await createCountry({ iso2: 'K', name: 'Korea', latitude: '37', longitude: '127.5' });
    await createCountry({ iso2: 'L', name: 'Liberia', latitude: '6.5', longitude: '-9.5' });
    await createCountry({ iso2: 'P', name: 'Paraguay', latitude: '-23', longitude: '-58' });
    await createCountry({ iso2: 'A', name: 'Argentina', latitude: '-34', longitude: '-64' });
    await createCountry({ iso2: 'B', name: 'Brazil', latitude: '-10', longitude: '-55' });
    await createCountry({ iso2: 'F', name: 'France', latitude: '46', longitude: '2' });
    await createCountry({ iso2: 'J', name: 'Japan', latitude: '36', longitude: '138' });
    mockSuccessGetLatest(['H', 'K', 'L', 'P', 'A', 'B', 'F', 'J']);
    successResponse = await getResponse({
      endpoint: '/lists/closer/latest',
      method: 'get',
      headers: { Authorization: token },
      query: {
        latitude: '48',
        longitude: '2'
      }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/closer/latest',
      method: 'get',
      query: { latitude: 'name', longitude: 'forty' }
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

describe('GET /lists/closer/history', () => {
  const expectedHistoryKeys = ['id', 'created_at', 'updated_at', 'deleted_at', 'name', 'timeseries'];
  let successResponse = {};
  let successResponseOffset = {};
  let invalidParamsResponse = {};
  beforeAll(async () => {
    await truncateDatabase();
    const token = await generateToken();
    await createUser();
    await createCountry({ iso2: 'H', name: 'Honduras', latitude: '15', longitude: '-86.5' });
    await createCountry({ iso2: 'K', name: 'Korea', latitude: '37', longitude: '127.5' });
    await createCountry({ iso2: 'L', name: 'Liberia', latitude: '6.5', longitude: '-9.5' });
    await createCountry({ iso2: 'P', name: 'Paraguay', latitude: '-23', longitude: '-58' });
    await createCountry({ iso2: 'A', name: 'Argentina', latitude: '-34', longitude: '-64' });
    await createCountry({ iso2: 'B', name: 'Brazil', latitude: '-10', longitude: '-55' });
    await createCountry({ iso2: 'F', name: 'France', latitude: '46', longitude: '2' });
    await createCountry({ iso2: 'J', name: 'Japan', latitude: '36', longitude: '138' });
    mockSuccessGetHistory(['H', 'K', 'L', 'P', 'A', 'B', 'F', 'J']);
    successResponse = await getResponse({
      endpoint: '/lists/closer/history',
      method: 'get',
      headers: { Authorization: token },
      query: {
        latitude: '48',
        longitude: '2'
      }
    });
    mockSuccessGetHistory(['H', 'K', 'L', 'P', 'A', 'B', 'F', 'J']);
    successResponseOffset = await getResponse({
      endpoint: '/lists/closer/history',
      method: 'get',
      headers: { Authorization: token },
      query: {
        latitude: '48',
        longitude: '2',
        offsets: JSON.stringify([
          { country_id: 1, offset: -1 },
          { country_id: 2, offset: 1 }
        ])
      }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/closer/history',
      method: 'get',
      query: { latitude: 'name', longitude: 'forty' }
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

  describe('Successful response with offset', () => {
    it('Should return status code 200', () => {
      expect(successResponseOffset.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      successResponseOffset.body.forEach(country => {
        expect(Object.keys(country)).toStrictEqual(expect.arrayContaining(expectedHistoryKeys));
      });
    });
    it('Should has first country with three timeseries', () => {
      expect(successResponseOffset.body[0].timeseries.length).toStrictEqual(5);
    });
    it('Should has second country with three timeseries', () => {
      expect(successResponseOffset.body[1].timeseries.length).toStrictEqual(3);
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
