const { getUserBy } = require('../services/users');
const { createTelegram } = require('../services/telegram');

exports.getTelegramLogin = (email, password, chatId) =>
    getUserBy({ email: email, password: password })
        .then(user => {
            if (!user) return 'User not found';
            createTelegram({ chatId: `${chatId}`, userId: user.id });
            return `Welcome ${user.name} ${user.lastName}!`
        });