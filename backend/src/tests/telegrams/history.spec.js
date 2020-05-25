const { mockSuccessGetHistory5LastDays } = require('../mocks/covid');
const { truncateDatabase } = require('../utils/app');
const { createUser } = require('../factories/users');
const { createList } = require('../factories/lists');
const { createManyCountries } = require('../factories/countries');
const { createCountryByList } = require('../factories/country_by_list');
const { getTelegramLogin } = require('../../app/telegram/sessions');
const { hashPassword } = require('../../app/services/sessions');
const { getTelegramHistoryByList } = require('../../app/telegram/lists');

const limit = 9999999999;

const telegramErrorsMessages = {
  listDontFound: "Cannot read property 'countries' of null"
};

describe('TELEGRAM BOT /history', () => {
  const password = '987654321';
  const chatIdRandom = Math.floor(Math.random() * limit);
  let listCreated = {};
  let successfulLatestResponse = {};
  let failListDontExists = {};
  beforeAll(async () => {
    const totalCountries = 2;
    await truncateDatabase();
    const userCreated = await createUser({ password: hashPassword(password) });
    await getTelegramLogin(userCreated.email, password, chatIdRandom);
    listCreated = await createList({ userId: userCreated.id });
    const [
      { iso2: firstIso2, id: firstCountryId },
      { iso2: secondIso2, id: secondCountryId }
    ] = await createManyCountries({
      quantity: totalCountries
    });
    mockSuccessGetHistory5LastDays([firstIso2, secondIso2]);
    await createCountryByList({ listId: listCreated.dataValues.id, countryId: firstCountryId });
    await createCountryByList({ listId: listCreated.dataValues.id, countryId: secondCountryId });
    successfulLatestResponse = await getTelegramHistoryByList(chatIdRandom, listCreated.dataValues.id, 5);
    await getTelegramHistoryByList(chatIdRandom, 855468, 5).catch(err => (failListDontExists = err.message));
  });
  describe('Successful get history by List by Telegram', () => {
    it('Should return the correct text response', () => {
      expect(successfulLatestResponse).toMatch('Confirmed');
      expect(successfulLatestResponse).toMatch('Recovered');
      expect(successfulLatestResponse).toMatch('Deaths');
    });
  });
  describe('Fail list was not found', () => {
    it('Should throw list was not found exception', () => {
      expect(failListDontExists).toBe(telegramErrorsMessages.listDontFound);
    });
  });
});
