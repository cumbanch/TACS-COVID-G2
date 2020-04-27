const TeleBot = require('telebot');

const { apiKey } = require('../../config').telegram;
const { getTelegramLogin } = require('../telegram/sessions');

const help = `Welcome to the COVID-19 Bot!
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

exports.telegram = () => {
    const bot = new TeleBot({
        token: apiKey,
        usePlugins: ['commandButton']
    });
    bot.on(['/start', '/help'], (msg) => msg.reply.text(help));
    bot.on(/^\/login (.+) (.+)$/, (msg, props) => getTelegramLogin(props.match[1], props.match[2], msg.from.id)
        .then((response) => msg.reply.text(response))
    );
    bot.start();
}
