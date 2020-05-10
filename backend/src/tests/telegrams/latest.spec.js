const { mockSuccessGetLatest } = require('../mocks/covid');
const { truncateDatabase } = require('../utils/app');
const { createUser } = require('../factories/users');
const { createList } = require('../factories/lists');
const { createManyCountries } = require('../factories/countries');
const { createCountryByList } = require('../factories/country_by_list');
const { getTelegramLogin } = require('../../app/telegram/sessions');
const { hashPassword } = require('../../app/services/sessions');
const { getTelegramLatestByList } = require('../../app/telegram/lists');

const limit = 9999999999;

const telegramErrorsMessages = {
  listDontFound: 'The list was not found'
};

describe('TELEGRAM BOT /latest', () => {
  const expectedLatestKeys = ['confirmed', 'deaths', 'recovered'];
  const password = '987654321';
  const chatIdRandom = Math.floor(Math.random() * limit);
  let listCreated = {};
  let listEmptyCreated = {};
  let successfulLatestResponse = {};
  let failListEmpty = {};
  let failListDontExists = {};
  beforeAll(async () => {
    const totalCountries = 2;
    await truncateDatabase();
    const userCreated = await createUser({ password: hashPassword(password) });
    await getTelegramLogin(userCreated.email, password, chatIdRandom);
    listCreated = await createList({ userId: userCreated.id });
    listEmptyCreated = await createList({ userId: userCreated.id });
    const [
      { iso2: firstIso2, id: firstCountryId },
      { iso2: secondIso2, id: secondCountryId }
    ] = await createManyCountries({
      quantity: totalCountries
    });
    mockSuccessGetLatest([firstIso2, secondIso2]);
    await createCountryByList({ listId: listCreated.dataValues.id, countryId: firstCountryId });
    await createCountryByList({ listId: listCreated.dataValues.id, countryId: secondCountryId });
    successfulLatestResponse = await getTelegramLatestByList(chatIdRandom, listCreated.dataValues.id);
    await getTelegramLatestByList(chatIdRandom, listEmptyCreated.dataValues.id).catch(
      err => (failListEmpty = err.message)
    );
    await getTelegramLatestByList(chatIdRandom, 855468).catch(err => (failListDontExists = err.message));
  });
  describe('Successful get latest by Telegram', () => {
    it('Should return the correct keys in response', () => {
      expect(Object.keys(successfulLatestResponse)).toStrictEqual(expect.arrayContaining(expectedLatestKeys));
    });
  });
  describe('Fail empty list', () => {
    it('Should throw list exmpty exception', () => {
      expect(failListEmpty).toBe(`The list ${listEmptyCreated.name} is empty`);
    });
  });
  describe('Fail list was not found', () => {
    it('Should throw list was not found exception', () => {
      expect(failListDontExists).toBe(telegramErrorsMessages.listDontFound);
    });
  });
});