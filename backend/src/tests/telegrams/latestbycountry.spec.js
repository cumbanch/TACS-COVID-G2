const { mockSuccessLatestCountry } = require('../mocks/covid');
const { truncateDatabase } = require('../utils/app');
const { createCountry } = require('../factories/countries');
const { getTelegramLatestByCountry } = require('../../app/telegram/countries');

const telegramErrorsMessages = {
  countryDontFound: 'The country was not found'
};

describe('TELEGRAM BOT /latestbycountry', () => {
  let successfulLatestResponse = {};
  let failCountryDontExists = {};
  beforeAll(async () => {
    await truncateDatabase();
    const countryCreated = await createCountry();
    mockSuccessLatestCountry();
    successfulLatestResponse = await getTelegramLatestByCountry(countryCreated.dataValues.name);
    failCountryDontExists = await getTelegramLatestByCountry("PaisInexistente");
  });
  describe('Successful get latest by Country by Telegram', () => {
    it('Should return the correct text response', () => {
      expect(successfulLatestResponse).toMatch('Confirmed');
      expect(successfulLatestResponse).toMatch('Recovered');
      expect(successfulLatestResponse).toMatch('Deaths');
    });
  });
  describe('Fail country was not found', () => {
    it('Should show country was not found message', () => {
      expect(failCountryDontExists).toBe(telegramErrorsMessages.countryDontFound);
    });
  });
});
