const { getUserBy } = require('../services/users');
const { createTelegram } = require('../services/telegram');
const { comparePassword } = require('../services/sessions');

exports.getTelegramLogin = (email, password, chatId) =>
  getUserBy({ email }).then(user => {
    if (!user) return 'User not found';
    return comparePassword(password, user.password).then(match => {
      if (!match) return 'User not found';
      return createTelegram({ chatId: `${chatId}`, userId: user.id }).then(
        () => `Welcome ${user.name} ${user.lastName}!`
      );
    });
  });
