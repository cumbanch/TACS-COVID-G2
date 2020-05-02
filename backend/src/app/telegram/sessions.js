const { getUserBy } = require('../services/users');
const { createTelegram } = require('../services/telegram');
const { comparePassword } = require('../services/sessions');

const telegramErrorsMessages = {
  invalidCredentials: 'Invalid credentials for the provided user'
};

exports.getTelegramLogin = (email, password, chatId) =>
  getUserBy({ email }).then(user => {
    if (!user) return telegramErrorsMessages.invalidCredentials;
    return comparePassword(password, user.password).then(match => {
      if (!match) return telegramErrorsMessages.invalidCredentials;
      return createTelegram({ chatId: `${chatId}`, userId: user.id }).then(
        () => `Welcome ${user.name} ${user.lastName}!`
      );
    });
  });
