const { getResponse, truncateDatabase } = require('../../utils/app');
const { createList } = require('../../factories/lists');
const { createCountry } = require('../../factories/countries');
const { createCountryByList } = require('../../factories/country_by_list');
const { createUser } = require('../../factories/users');
const { generateToken } = require('../../factories/tokens');
const { List, CountryByList } = require('../../../app/models');

describe('DELETE /lists/:id', () => {
  let successResponse = {};
  let invalidParamsResponse = {};
  let listDeleted = null;
  let countryByListDeleted = null;
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    const { id: listId } = await createList({ userId });
    await createCountry();
    await createCountryByList({ listId, countryId: 1 });
    successResponse = await getResponse({
      endpoint: `/lists/${listId}`,
      method: 'delete',
      headers: { Authorization: token }
    });
    listDeleted = await List.findOne({ where: { id: listId } });
    countryByListDeleted = await CountryByList.findOne({ where: { id: listId } });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/asdasd',
      method: 'delete'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 204', () => {
      expect(successResponse.statusCode).toEqual(204);
    });
    it('Should delete the list', () => {
      expect(listDeleted).toBeNull();
    });
    it('Should delete country by list', () => {
      expect(countryByListDeleted).toBeNull();
    });
  });
  describe('Fail for invalid request', () => {
    it('Should return an error indicating the provided authorization header is not valid', () => {
      expect(invalidParamsResponse.body.message).toContain(
        'Authorization must be a jwt token and must be contained in headers'
      );
    });
    it('Should return an error indicating the provided list id is not valid', () => {
      expect(invalidParamsResponse.body.message).toContain(
        'list id must be an integer and be contained in path'
      );
    });
  });
});

describe('DELETE /lists/:id/countries', () => {
  let successfulResponse = {};
  let countriesByListDeleted = {};
  let invalidParamsResponse = {};
  let listNotFoundResponse = {};
  beforeAll(async () => {
    const token = await generateToken();
    await truncateDatabase();
    const { id: userId } = await createUser();
    const { id: countryId } = await createCountry();
    const { id: listId } = await createList({ userId });
    await createCountryByList({ listId, countryId });
    successfulResponse = await getResponse({
      endpoint: `/lists/${listId}/countries`,
      method: 'delete',
      body: { country_id: countryId },
      headers: { Authorization: token }
    });
    listNotFoundResponse = await getResponse({
      endpoint: '/lists/14/countries',
      method: 'delete',
      body: { country_id: countryId },
      headers: { Authorization: token }
    });
    countriesByListDeleted = await CountryByList.count({ where: { listId } });
    invalidParamsResponse = await getResponse({
      endpoint: '/lists/sadasdas/countries',
      method: 'delete'
    });
  });
  describe('Successful response', () => {
    it('Should return status code 204', () => {
      expect(successfulResponse.statusCode).toEqual(204);
    });
    it('Should delete one country by list', () => {
      expect(countriesByListDeleted).toBe(0);
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
