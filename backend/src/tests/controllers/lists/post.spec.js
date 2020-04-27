const { getResponse, truncateDatabase } = require('../../utils/app');
const { createManyCountries, createCountry } = require('../../factories/countries');
const { createUser } = require('../../factories/users');
const { List, CountryByList } = require('../../../app/models');
const { generateToken } = require('../../factories/tokens');
const { createList } = require('../../factories/lists');

describe('POST /lists', () => {
  const totalCountries = 2;
  let successfulResponse = {};
  let listCreated = {};
  let countriesByListCreated = {};
  let invalidParamsResponse = {};
  let invalidCountriesResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    await createUser();
    await createManyCountries({ quantity: totalCountries });
    successfulResponse = await getResponse({
      endpoint: '/lists',
      method: 'post',
      body: { countries: [1, 2], name: 'dummy' },
      headers: { Authorization: token }
    });
    invalidCountriesResponse = await getResponse({
      endpoint: '/lists',
      method: 'post',
      body: { countries: [179446, 87944], name: 'dummy' },
      headers: { Authorization: token }
    });
    listCreated = await List.findOne();
    countriesByListCreated = await CountryByList.count({ where: { listId: 1 } });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists',
      method: 'post'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 201', () => {
      expect(successfulResponse.statusCode).toEqual(201);
    });
    it('Should created one list', () => {
      expect(listCreated).not.toBeNull();
    });
    it(`Should created ${totalCountries} country by list`, () => {
      expect(countriesByListCreated).toBe(totalCountries);
    });
  });
  describe('Fail for invalid request', () => {
    it('Should return status code 400', () => {
      expect(invalidParamsResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_params', () => {
      expect(invalidParamsResponse.body.internal_code).toBe('invalid_params');
    });
    it('Should return an error indicating the provided name is not valid', () => {
      expect(invalidParamsResponse.body.message).toContain('name must be a string and be contained in body');
    });
    it('Should return an error indicating the provided countries are not valid', () => {
      expect(invalidParamsResponse.body.message).toContain('countries must be an array of integers');
    });
    it('Should return an error indicating the provided authorization header is not valid', () => {
      expect(invalidParamsResponse.body.message).toContain(
        'Authorization must be a jwt token and must be contained in headers'
      );
    });
  });
  describe('Fail for invalid countries', () => {
    it('Should return status code 400', () => {
      expect(invalidCountriesResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_countries', () => {
      expect(invalidCountriesResponse.body.internal_code).toBe('invalid_countries');
    });
    it('Should return message indicating the provided countries are invalid', () => {
      expect(invalidCountriesResponse.body.message).toBe('The provided countries are invalid');
    });
  });
});

describe('POST /lists/:id/countries', () => {
  let successfulResponse = {};
  let countriesByListCreated = {};
  let invalidParamsResponse = {};
  let listNotFoundResponse = {};
  let invalidCountriesResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    const { id: countryId } = await createCountry();
    const { id: listId } = await createList({ userId });
    successfulResponse = await getResponse({
      endpoint: `/lists/${listId}/countries`,
      method: 'post',
      body: { country_id: countryId },
      headers: { Authorization: token }
    });
    listNotFoundResponse = await getResponse({
      endpoint: '/lists/14/countries',
      method: 'post',
      body: { country_id: countryId },
      headers: { Authorization: token }
    });
    invalidCountriesResponse = await getResponse({
      endpoint: `/lists/${listId}/countries`,
      method: 'post',
      body: { country_id: 18779 },
      headers: { Authorization: token }
    });
    countriesByListCreated = await CountryByList.count({ where: { listId } });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/sadasdas/countries',
      method: 'post'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 201', () => {
      expect(successfulResponse.statusCode).toEqual(201);
    });
    it('Should created one country by list', () => {
      expect(countriesByListCreated).toBe(1);
    });
  });
  describe('Fail for list not found', () => {
    it('Should return status code 404', () => {
      expect(listNotFoundResponse.statusCode).toEqual(404);
    });
    it('Should return internal_code not_found', () => {
      expect(listNotFoundResponse.body.internal_code).toBe('not_found');
    });
    it('Should return message indicating the provided list was not found', () => {
      expect(listNotFoundResponse.body.message).toBe('The list was not found');
    });
  });
  describe('Fail for invalid country', () => {
    it('Should return status code 404', () => {
      expect(invalidCountriesResponse.statusCode).toEqual(404);
    });
    it('Should return internal_code not_found', () => {
      expect(invalidCountriesResponse.body.internal_code).toBe('not_found');
    });
    it('Should return message indicating the country was not found', () => {
      expect(invalidCountriesResponse.body.message).toBe('The country was not found');
    });
  });
  describe('Fail for invalid request', () => {
    it('Should return status code 400', () => {
      expect(invalidParamsResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code invalid_params', () => {
      expect(invalidParamsResponse.body.internal_code).toBe('invalid_params');
    });
    it('Should return an error indicating the provided list id is invalid', () => {
      expect(invalidParamsResponse.body.message).toContain(
        'list id must be an integer and be contained in path'
      );
    });
    it('Should return an error indicating the provided country_id is invalid', () => {
      expect(invalidParamsResponse.body.message).toContain(
        'country_id must be an integer and be contained in body'
      );
    });
    it('Should return an error indicating the provided authorization header is not valid', () => {
      expect(invalidParamsResponse.body.message).toContain(
        'Authorization must be a jwt token and must be contained in headers'
      );
    });
  });
});
