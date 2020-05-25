const { truncateDatabase } = require('../utils/app');
const { createUser } = require('../factories/users');
const { createList } = require('../factories/lists');
const { createCountryByList } = require('../factories/country_by_list');
const { createManyCountries } = require('../factories/countries');
const { getTelegramLogin } = require('../../app/telegram/sessions');
const { hashPassword } = require('../../app/services/sessions');
const { getTelegramListWithCountries } = require('../../app/telegram/lists');

const limit = 9999999999;

describe('TELEGRAM BOT list pagination', () => {
  const password = '987654321';
  const chatIdRandom = Math.floor(Math.random() * limit);
  let listCreated = {};
  let successfulListWCResponse = {};
  beforeAll(async () => {
    const totalCountries = 2;
    await truncateDatabase();
    const userCreated = await createUser({ password: hashPassword(password) });
    await getTelegramLogin(userCreated.email, password, chatIdRandom);
    listCreated = await createList({ userId: userCreated.id });
    const [{ id: firstCountryId }, { id: secondCountryId }] = await createManyCountries({
      quantity: totalCountries
    });
    await createCountryByList({ listId: listCreated.dataValues.id, countryId: firstCountryId });
    await createCountryByList({ listId: listCreated.dataValues.id, countryId: secondCountryId });
    successfulListWCResponse = await getTelegramListWithCountries(chatIdRandom, listCreated.dataValues.id);
  });
  describe('Successful get lists with countries by Telegram', () => {
    it('Should return 2 countries in response', () => {
      expect(successfulListWCResponse.countries.length).toBe(2);
    });
  });
});
