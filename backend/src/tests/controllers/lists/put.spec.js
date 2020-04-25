const { getResponse, truncateDatabase } = require('../../utils/app');
const { createManyCountries } = require('../../factories/countries');
const { createCountryByList } = require('../../factories/country_by_list');
const { createUser } = require('../../factories/users');
const { CountryByList } = require('../../../app/models');
const { generateToken } = require('../../factories/tokens');
const { createList } = require('../../factories/lists');

describe('PUT /lists/:id', () => {
  const totalCountries = 3;
  let successfulResponse = {};
  let countriesByListCreated = {};
  let emptyBodyResponse = {};
  let invalidCountriesResponse = {};
  let invalidParamsResponse = {};
  let listNotFoundResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    const { id: listId } = await createList({ userId });
    await createManyCountries({ quantity: totalCountries });
    await createCountryByList({ listId, countryId: 1 });
    await createCountryByList({ listId, countryId: 2 });
    await createCountryByList({ listId, countryId: 3 });
    successfulResponse = await getResponse({
      endpoint: `/lists/${listId}`,
      method: 'put',
      body: { countries: [1, 3] },
      headers: { Authorization: token }
    });
    countriesByListCreated = await CountryByList.count({ where: { listId: 1, countryId: [1, 3] } });
    emptyBodyResponse = await getResponse({
      endpoint: `/lists/${listId}`,
      method: 'put',
      headers: { Authorization: token }
    });
    invalidCountriesResponse = await getResponse({
      endpoint: `/lists/${listId}`,
      method: 'put',
      body: { countries: [179446, 87944], name: 'dummy' },
      headers: { Authorization: token }
    });
    listNotFoundResponse = await getResponse({
      endpoint: '/lists/14',
      method: 'put',
      body: { countries: [1, 3] },
      headers: { Authorization: token }
    });
    invalidParamsResponse = await getResponse({
      endpoint: `/lists/${listId}`,
      method: 'put',
      body: { name: 1234, countries: 'countries' }
    });
  });
  describe('Successful response', () => {
    it('Should return status code 204', () => {
      expect(successfulResponse.statusCode).toEqual(204);
    });
    it(`Should exist ${totalCountries - 1} country by list`, () => {
      expect(countriesByListCreated).toBe(totalCountries - 1);
    });
  });
  describe('Fail for empty body', () => {
    it('Should return status code 400', () => {
      expect(emptyBodyResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code non_empty_body', () => {
      expect(emptyBodyResponse.body.internal_code).toBe('non_empty_body');
    });
    it('Should return message indicating the provided body are invalid', () => {
      expect(emptyBodyResponse.body.message).toBe("The body musn't be empty");
    });
  });
  describe('Fail for invalid countries', () => {
    it('Should return status code 400', () => {
      expect(invalidCountriesResponse.statusCode).toEqual(400);
    });
    it('Should return internal_code not_found', () => {
      expect(invalidCountriesResponse.body.internal_code).toBe('invalid_countries');
    });
    it('Should return message indicating the provided countries are invalid', () => {
      expect(invalidCountriesResponse.body.message).toBe('The provided countries are invalid');
    });
  });
  describe('Fail for list not found', () => {
    it('Should return status code 404', () => {
      expect(listNotFoundResponse.statusCode).toEqual(404);
    });
    it('Should return internal_code not_found', () => {
      expect(listNotFoundResponse.body.internal_code).toBe('not_found');
    });
    it('Should return message indicating the provided list was not founded', () => {
      expect(listNotFoundResponse.body.message).toBe('The list was not found');
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
    it('Should return an error indicating the provided countries is not valid', () => {
      expect(invalidParamsResponse.body.message).toContain('countries must be an array of integers');
    });
    it('Should return an error indicating the provided authorization header is not valid', () => {
      expect(invalidParamsResponse.body.message).toContain(
        'Authorization must be a jwt token and must be contained in headers'
      );
    });
  });
});
