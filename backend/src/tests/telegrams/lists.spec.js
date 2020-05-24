const { truncateDatabase } = require('../utils/app');
const { createUser } = require('../factories/users');
const { createManyLists } = require('../factories/lists');
const { getTelegramLogin } = require('../../app/telegram/sessions');
const { hashPassword } = require('../../app/services/sessions');
const { getTelegramLists } = require('../../app/telegram/lists');
const { listPagination } = require('../../config').telegram;

const limit = 9999999999;

describe('TELEGRAM BOT list pagination', () => {
  const password = '987654321';
  const chatIdRandom = Math.floor(Math.random() * limit);
  const totalLists = listPagination + 3;
  let successfulListsPage1Response = {};
  let successfulListsPage2Response = {};
  let successfulListsPage3Response = {};
  beforeAll(async () => {
    await truncateDatabase();
    const userCreated = await createUser({ password: hashPassword(password) });
    await getTelegramLogin(userCreated.email, password, chatIdRandom);
    await createManyLists({ list: { userId: userCreated.id }, quantity: totalLists });
    successfulListsPage1Response = await getTelegramLists(chatIdRandom, 1);
    successfulListsPage2Response = await getTelegramLists(chatIdRandom, 2);
    successfulListsPage3Response = await getTelegramLists(chatIdRandom, 3);
  });
  describe(`Successful get ${listPagination} lists in page 1 by Telegram`, () => {
    it(`Should return ${listPagination} lists in response`, () => {
      expect(successfulListsPage1Response.rows.length).toBe(listPagination);
    });
  });
  describe(`Successful get ${totalLists - listPagination} lists in page 2 by Telegram`, () => {
    it(`Should return ${totalLists - listPagination} lists in response`, () => {
      expect(successfulListsPage2Response.rows.length).toBe(totalLists - listPagination);
    });
  });
  describe('Successful get 0 lists in page 3 by Telegram', () => {
    it('Should return 0 lists in response', () => {
      expect(successfulListsPage3Response.rows.length).toBe(0);
    });
  });
});
