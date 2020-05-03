const TeleBot = require('telebot');
const { chunk } = require('lodash');

const { apiKey } = require('../../config').telegram;
const { getTelegramLogin } = require('../telegram/sessions');
const { getTelegramLists, getTelegramLatestByList } = require('../telegram/lists');

const help = `Welcome to the COVID-19 Bot!
This bot was created by the Group 2 of TACS
UTN-FRBA

You can control me by sending these commands:

/start - welcome message and show the list of commands
/help - welcome message and show the list of commands

/login - username and password

/latest - get the latest covid status for the all countries in the list
/latestofcountry - get the lastets covid status for a country

/history - get a comparative table of the all countries in a list
/addcountry - add a new country to a list
/countries - get the list of countries in a list

Please, start to login`;

const getListButtons = (msg, page, bot) =>
  getTelegramLists(msg.from.id, page).then(lists => {

    if (lists.count > 0) {
      let listButtons = [];
      let messageTitle = 'You have not more lists';
      if (lists.rows.length > 0) {
        listButtons = chunk(
          lists.rows.map(list =>
            bot.inlineButton(list.dataValues.name, { callback: `/lists/${list.dataValues.id}/latest` })
          ),
          3
        );
        listButtons.push([
          bot.inlineButton('<< Previus', { callback: `/latest/${page > 1 ? page - 1 : 1}` }),
          bot.inlineButton('Next >>', { callback: `/latest/${page + 1}` })
        ]);
        messageTitle = `Select one of your lists (Page ${page}).`;
      }
      else {
        listButtons.push([bot.inlineButton('<< Previus', { callback: `/latest/${page > 1 ? page - 1 : 1}` })]);
      }
      const replyMarkup = bot.inlineKeyboard(listButtons);
      return bot.sendMessage(msg.from.id, messageTitle, { replyMarkup });
    }
    return msg.reply.text('You dont have any list. Please, create a new list.');
  });


exports.telegram = () => {
  const bot = new TeleBot({
    token: apiKey,
    usePlugins: ['commandButton']
  });
  bot.on(['/start', '/help'], msg => msg.reply.text(help));
  bot.on(/^\/login (.+) (.+)$/, (msg, props) =>
    getTelegramLogin(props.match[1], props.match[2], msg.from.id).then(response => msg.reply.text(response))
  );
  bot.on(/^\/latest$/, msg => getListButtons(msg, 1, bot));
  bot.on(/^\/latest\/(.+)$/, (msg, props) => getListButtons(msg, parseInt(props.match[1]), bot));
  bot.on(/^\/lists\/(.+)\/latest$/, (msg, props) => getTelegramLatestByList(msg.from.id, parseInt(props.match[1]))
    .then(latest => bot.sendMessage(msg.from.id, `Confirmed: ${latest.confirmed}, Deaths: ${latest.deaths}, Recovered: ${latest.recovered}`))
    .catch(err => bot.sendMessage(msg.from.id, err.message))
  );
  bot.start();
};
