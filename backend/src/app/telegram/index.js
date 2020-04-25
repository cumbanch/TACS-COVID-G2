const TeleBot = require('telebot');
const { apiKey } = require('../../config').telegram;

const { getUserBy } = require('../services/users');
const { getAllList } = require('../services/lists');
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
    getUserBy({ email: email, password: password })
        .then(user => {
            if (!user) return 'User not found';
            createTelegram({ chatId: `${chatId}`, userId: user.id });
            return `Welcome ${user.name} ${user.lastName}!`
        });

exports.latestoflist = (chatId, listName) =>
    getTelegram({ chatId: chatId })
        .then(telegram => getListWithCountries({ userId: telegram.userId, name: listName })
            .then(list => {
                if (!list) throw notFound('List not found');
                return getLatestByList(list);
            })
            .catch(next)
        );

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
    bot.on(/^\/latestoflist (.+)$/, (msg, props) => this.lists(msg.from.id, props.match[1])
        .then((response) => msg.reply.text(response))
    );
    bot.start();
}