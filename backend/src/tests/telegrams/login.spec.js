const { truncateDatabase } = require('../utils/app');
const { createUser } = require('../factories/users');
const { getTelegramBy } = require('../../app/services/telegram');
const { getTelegramLogin } = require('../../app/telegram/sessions');
const { hashPassword } = require('../../app/services/sessions');

const limit = 9999999999;

describe('TELEGRAM BOT /login', () => {
  const password = '987654321';
  const chatIdRandom = Math.floor(Math.random() * limit);
  let telegramCreated = {};
  let userCreated = {};
  let successfulLoginResponse = {};
  let failLoginWrongPassword = {};
  let failLoginWrongEmail = {};
  let failLoginWrongEmailAndPassword = {};
  beforeAll(async () => {
    await truncateDatabase();
    userCreated = await createUser({ password: hashPassword(password) });
    successfulLoginResponse = await getTelegramLogin(userCreated.email, password, chatIdRandom);
    telegramCreated = await getTelegramBy({ chatId: chatIdRandom });
    failLoginWrongPassword = await getTelegramLogin(userCreated.email, '123456789', chatIdRandom);
    failLoginWrongEmail = await getTelegramLogin(userCreated.email, userCreated.password, chatIdRandom);
    failLoginWrongEmailAndPassword = await getTelegramLogin('pepe@gmail.com', '123456789', chatIdRandom);
  });
  describe('Successful login', () => {
    it('Should return Welcome message', () => {
      expect(successfulLoginResponse).toBe(`Welcome ${userCreated.name} ${userCreated.lastName}!`);
    });
    it('Should create a telegram for the created user', () => {
      expect(telegramCreated.userId).toEqual(userCreated.id);
    });
  });
  describe('Fail login wrong email', () => {
    it('Should return User not found message', () => {
      expect(failLoginWrongEmail).toBe('User not found');
    });
  });
  describe('Fail login wrong password', () => {
    it('Should return User not found message', () => {
      expect(failLoginWrongPassword).toBe('User not found');
    });
  });
  describe('Fail login wrong email and password', () => {
    it('Should return User not found message', () => {
      expect(failLoginWrongEmailAndPassword).toBe('User not found');
    });
  });
});
