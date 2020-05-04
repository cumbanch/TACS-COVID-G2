const { truncateDatabase } = require('../utils/app');
const { createUser } = require('../factories/users');
const { createList } = require('../factories/lists');
const { createManyCountries } = require('../factories/countries');
const { createCountryByList } = require('../factories/country_by_list');
const { getTelegramLogin } = require('../../app/telegram/sessions');
const { hashPassword } = require('../../app/services/sessions');
const { addCountryToList } = require('../../app/telegram/lists');

const limit = 9999999999;

const telegramErrorsMessages = {
  listDontFound: 'The list was not found',
  countryNotfound: 'The provided country is invalid'
};

describe('TELEGRAM BOT /latest', () => {
  const password = '987654321';
  const chatIdRandom = Math.floor(Math.random() * limit);
  let listCreated = {};
  let listEmptyCreated = {};
  let successfulAddCountryResponse = {};
  let failNotFoundCountry = {};
  let failListDontExists = {};
  let thirdCountryCreatedId = {};
  beforeAll(async () => {
    const totalCountries = 3;
    await truncateDatabase();
    const userCreated = await createUser({ password: hashPassword(password) });
    await getTelegramLogin(userCreated.email, password, chatIdRandom);
    listCreated = await createList({ userId: userCreated.id });
    listEmptyCreated = await createList({ userId: userCreated.id });
    const [
      { id: firstCountryId },
      { id: secondCountryId },
      { id: thirdCountryId, name: thirdCountryName }
    ] = await createManyCountries({
      quantity: totalCountries
    });
    thirdCountryCreatedId = thirdCountryId;
    await createCountryByList({ listId: listCreated.dataValues.id, countryId: firstCountryId });
    await createCountryByList({ listId: listCreated.dataValues.id, countryId: secondCountryId });
    successfulAddCountryResponse = await addCountryToList(
      chatIdRandom,
      listCreated.dataValues.id,
      thirdCountryName
    );
    await addCountryToList(chatIdRandom, listEmptyCreated.dataValues.id, 'PaisInexistente').catch(
      err => (failNotFoundCountry = err.message)
    );
    await addCountryToList(chatIdRandom, 785667, thirdCountryName).catch(
      err => (failListDontExists = err.message)
    );
  });
  describe('Successful add country to list by Telegram', () => {
    it('Should return a country by list with the country id added', () => {
      expect(successfulAddCountryResponse.dataValues.countryId).toBe(thirdCountryCreatedId);
    });
    it('Should return a country by list with the list id added', () => {
      expect(successfulAddCountryResponse.dataValues.listId).toBe(listCreated.dataValues.id);
    });
  });
  describe('Fail empty list', () => {
    it('Should throw list exmpty exception', () => {
      expect(failNotFoundCountry).toBe(telegramErrorsMessages.countryNotfound);
    });
  });
  describe('Fail list was not found', () => {
    it('Should throw list was not found exception', () => {
      expect(failListDontExists).toBe(telegramErrorsMessages.listDontFound);
    });
  });
});
