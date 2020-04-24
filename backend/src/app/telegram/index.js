const TeleBot = require('telebot');
const { apiKey } = require('../../config').telegram;

const { getUserBy } = require('../services/users');
//const { getAllList } = require('../services/lists');
const { getTelegram, createTelegram, deleteTelegram } = require('../services/telegram');


exports.help = () => {
    return `Welcome to the COVID-19 Bot!
This bot was created by the Group 2 of TACS
UTN-FRBA

You can control me by sending these commands:

/start - welcome message and show the list of commands
/help - welcome message and show the list of commands

/login - username and password

/latestoflist - get the latest covid status for the all countries in the list
/latestofcountry - get the lastets covid status for a country

/history - get a comparative table of the all countries in a list
/addcountry - add a new country to a list
/countries - get the list of countries in a list

Please, start to login`;
}

exports.login = (email, password, chatId) =>
    getUserBy({ email: email , password: password })
        .then(user => {
            if (!user) return 'User not found';
            createTelegram({ chatId: chatId, userId: user.id });
            return `Welcome ${user.name} ${user.lastName}!`
        });
/*
exports.lists = (chatId) =>
    getTelegram({ chatId: chatId }) //, password: password })
        .then(telegram =>
            getAllList({ userId = telegram.userId })
                .then(lists => {
                    const inlineKeyboard = [];                    
                    lists.forEach(list => inlineKeyboard.push(bot.inlineButton(list.name, {callback: `/lists/${list.id}`})));
                    const replyMarkup = bot.inlineKeyboard(inlineKeyboard);
                    // Send message with keyboard markup
                    return bot.sendMessage(chatId, 'Choose one of your lists.', {replyMarkup});
                }));
*/
exports.telegram = () => {
    const bot = new TeleBot({
        token: apiKey,
        usePlugins: ['commandButton']
    });
    bot.on(['/start', '/help'], (msg) => msg.reply.text(this.help()));
    bot.on(/^\/login (.+) (.+)$/, (msg, props) => {
        this.login(props.match[1], props.match[2], msg.from.id)
            .then((response) => msg.reply.text(response));
    });
    //bot.on(/^\/lists$/, (msg, props) => this.lists(msg.from.id));
    bot.start();
}