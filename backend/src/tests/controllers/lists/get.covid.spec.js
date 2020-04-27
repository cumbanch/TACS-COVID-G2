const { mockSuccessGetLatest, mockFailCovid, mockSuccessGetHistory } = require('../../mocks/covid');
const { getResponse, truncateDatabase } = require('../../utils/app');
const { createList } = require('../../factories/lists');
const { createManyCountries } = require('../../factories/countries');
const { createCountryByList } = require('../../factories/country_by_list');
const { createUser } = require('../../factories/users');
const { generateToken } = require('../../factories/tokens');

describe('GET /lists/:id/latest', () => {
  const expectedLatestKeys = ['confirmed', 'deaths', 'recovered'];
  const totalCountries = 3;
  let successResponse = {};
  let invalidParamsResponse = {};
  let covidFailResponse = {};
  let listNotFoundResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    const { id: listId } = await createList({ userId });
    const [{ iso2: firstIso2 }, { iso2: secondIso2 }] = await createManyCountries({
      quantity: totalCountries
    });
    await createCountryByList({ listId, countryId: 1 });
    await createCountryByList({ listId, countryId: 2 });
    await createCountryByList({ listId, countryId: 3 });
    mockSuccessGetLatest([firstIso2, secondIso2]);
    successResponse = await getResponse({
      endpoint: `/lists/${listId}/latest`,
      method: 'get',
      headers: { Authorization: token }
    });
    mockFailCovid();
    covidFailResponse = await getResponse({
      endpoint: `/lists/${listId}/latest`,
      method: 'get',
      headers: { Authorization: token }
    });
    listNotFoundResponse = await getResponse({
      endpoint: '/lists/13/latest',
      method: 'get',
      headers: { Authorization: token }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/asda/latest',
      method: 'get'
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
  describe('Fail for covid error', () => {
    it('Should return status code 503', () => {
      expect(covidFailResponse.statusCode).toEqual(503);
    });
    it('Should return internal_code external_service_error', () => {
      expect(covidFailResponse.body.internal_code).toBe('external_service_error');
    });
    it('Should return an error indicating there was an error getting latest results', () => {
      expect(covidFailResponse.body.message).toBe(
        'There was an error getting the latest results, reason: Default error covid api'
      );
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
    it('Should return an error indicating the provided list id is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('list id must be an integer and be contained in path')
      ).toBe(true);
    });
  });
});

describe('GET /lists/:id/history', () => {
  const expectedHistoryKeys = ['id', 'created_at', 'updated_at', 'deleted_at', 'name', 'timeseries'];
  const totalCountries = 2;
  let successResponse = {};
  let invalidParamsResponse = {};
  let covidFailResponse = {};
  let listNotFoundResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    const { id: listId } = await createList({ userId });
    const [{ iso2: firstIso2 }, { iso2: secondIso2 }] = await createManyCountries({
      quantity: totalCountries
    });
    await createCountryByList({ listId, countryId: 1 });
    await createCountryByList({ listId, countryId: 2 });
    mockSuccessGetHistory([firstIso2, secondIso2]);
    successResponse = await getResponse({
      endpoint: `/lists/${listId}/history`,
      method: 'get',
      headers: { Authorization: token }
    });
    mockFailCovid();
    covidFailResponse = await getResponse({
      endpoint: `/lists/${listId}/history`,
      method: 'get',
      headers: { Authorization: token }
    });
    listNotFoundResponse = await getResponse({
      endpoint: '/lists/13/history',
      method: 'get',
      headers: { Authorization: token }
    });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/asda/history',
      method: 'get'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 200', () => {
      expect(successResponse.statusCode).toEqual(200);
    });
    it('Should return the correct keys in body', () => {
      successResponse.body.forEach(country => {
        expect(Object.keys(country)).toStrictEqual(expect.arrayContaining(expectedHistoryKeys));
      });
    });
  });
  describe('Fail for covid error', () => {
    it('Should return status code 503', () => {
      expect(covidFailResponse.statusCode).toEqual(503);
    });
    it('Should return internal_code external_service_error', () => {
      expect(covidFailResponse.body.internal_code).toBe('external_service_error');
    });
    it('Should return an error indicating there was an error getting history', () => {
      expect(covidFailResponse.body.message).toBe(
        'There was an error getting the history, reason: Default error covid api'
      );
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
    it('Should return an error indicating the provided list id is not valid', () => {
      expect(
        invalidParamsResponse.body.message.includes('list id must be an integer and be contained in path')
      ).toBe(true);
    });
  });
});
