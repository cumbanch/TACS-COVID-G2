const { truncateDatabase } = require('../../utils/app');
const { createUser } = require('../../factories/users');
const { getTelegramBy } = require('../../factories/telegram');
const { getTelegramLogin } = require('../../app/telegram/sessions');

const limit = 9999999999;

const getRandomNumber = (maxRange = limit) => Math.floor(Math.random() * maxRange);

describe('TELEGRAM BOT /login', () => {
  const chatIdRandom = getRandomNumber;
  let telegramCreated = {};
  let userCreated = {};
  beforeAll(async () => {
    await truncateDatabase();
    userCreated = await createUser();
  });
  describe('Successful login', () => {
    it('Should return Welcome message', () => {
      expect(getTelegramLogin(userCreated.email, userCreated.password, chatIdRandom)).toEqual(
        `Welcome ${userCreated.name} ${userCreated.lastName}!`
      );
    });
    it('Should create a telegram for the created user', () => {
      telegramCreated = getTelegramBy({ chatId: chatIdRandom });
      expect(telegramCreated.userId).toEqual(userCreated.id);
    });
  });
  describe('Fail login', () => {
    it('Should return User not found message', () => {
      expect(getTelegramLogin(userCreated.email, '123456789', chatIdRandom)).toEqual('User not found');
    });
    it('Should return User not found message', () => {
      expect(getTelegramLogin('pepe@gmail.com', '123456789', chatIdRandom)).toEqual('User not found');
    });
  });
});
