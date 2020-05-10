const TeleBot = require('telebot');
const { chunk } = require('lodash');

const { apiKey } = require('../../config').telegram;
const { getTelegramLogin } = require('../telegram/sessions');
const { getTelegramLists, getTelegramLatestByList, addCountryToList } = require('../telegram/lists');
const { getTelegramLatestByCountry } = require('../telegram/countries');

const help = `Welcome to the COVID-19 Bot!
This bot was created by the Group 2 of TACS
UTN-FRBA

You can control me by sending these commands:

/start - welcome message and show the list of commands
/help - welcome message and show the list of commands

/login {email} {password} - username and password

/latestByList - get the latest covid status for the all countries in the list
/latestByCountry {countryName} - get the lastets covid status for a country

/history - get a comparative table of the all countries in a list
/addcountry {countryName} - add a new country to a list
/countries - get the list of countries in a list

Please, start to login`;

const callbackButtons = {
  latest: {
    action: '/lists/id/latest',
    pagination: '/latestByList/page'
  },
  addCountry: {
    action: '/lists/id/country/countryName',
    pagination: '/addCountry/countryName/page'
  }
};

const parseCovidResults = latest =>
  `Confirmed: <b>${latest.confirmed}</b>\nDeaths: <b>${latest.deaths}</b>\nRecovered: <b>${latest.recovered}</b>`;

const getListButtons = (msg, page, bot, callbackButton) =>
  bot.sendMessage(msg.from.id, 'Loading Lists...', { parseMode: 'html' }).then(response =>
    getTelegramLists(msg.from.id, page).then(lists => {
      if (lists.count === 0) {
        return bot.editMessageText(
          { chatId: msg.from.id, messageId: response.message_id },
          'You dont have any list. Please, create a new list.'
        );
      }

      const prevButton = bot.inlineButton('<< Previus', {
        callback: callbackButton.pagination.replace('page', page > 1 ? page - 1 : 1)
      });

      let listButtons = [];
      let messageTitle = 'You have not more lists';
      if (lists.rows.length > 0) {
        listButtons = chunk(
          lists.rows.map(list =>
            bot.inlineButton(list.dataValues.name, {
              callback: callbackButton.action.replace('id', list.dataValues.id)
            })
          ),
          3
        );
        listButtons.push([
          prevButton,
          bot.inlineButton('Next >>', { callback: callbackButton.pagination.replace('page', page + 1) })
        ]);
        messageTitle = `Select one of your lists (Page ${page}).`;
      } else {
        listButtons.push([prevButton]);
      }
      const replyMarkup = bot.inlineKeyboard(listButtons);
      bot.editMessageText({ chatId: msg.from.id, messageId: response.message_id }, messageTitle);
      return bot.editMessageReplyMarkup(
        { chatId: msg.from.id, messageId: response.message_id },
        { replyMarkup }
      );
    })
  );

exports.telegram = () => {
  const bot = new TeleBot({
    token: apiKey,
    usePlugins: ['commandButton']
  });
  bot.on(['/start', '/help'], msg => msg.reply.text(help));
  bot.on(/^\/login (.+) (.+)$/, (msg, props) =>
    getTelegramLogin(props.match[1], props.match[2], msg.from.id).then(response => msg.reply.text(response))
  );
  bot.on(/^\/latestByList\/?(\d+)?$/, (msg, props) =>
    getListButtons(msg, props.match[1] ? parseInt(props.match[1]) : 1, bot, callbackButtons.latest)
  );
  bot.on(/^\/lists\/(\d+)\/latest$/, (msg, props) =>
    bot
      .sendMessage(msg.from.id, 'Getting the latest values for the selected List...', { parseMode: 'html' })
      .then(response =>
        getTelegramLatestByList(msg.from.id, parseInt(props.match[1]))
          .then(latest =>
            bot.editMessageText(
              { chatId: msg.from.id, messageId: response.message_id },
              parseCovidResults(latest),
              { parseMode: 'html' }
            )
          )
          .catch(err =>
            bot.editMessageText({ chatId: msg.from.id, messageId: response.message_id }, err.message)
          )
      )
  );
  bot.on(/^\/addCountry(\/|\s)([A-Za-z ]+)\/?(\d+)?$/, (msg, props) =>
    getListButtons(msg, props.match[3] ? parseInt(props.match[3]) : 1, bot, {
      action: callbackButtons.addCountry.action.replace('countryName', props.match[2]),
      pagination: callbackButtons.addCountry.pagination.replace('countryName', props.match[2])
    })
  );
  bot.on(/^\/lists\/(\d+)\/country\/(.+)$/, (msg, props) => {
    const listId = parseInt(props.match[1]);
    const countryName = props.match[2];
    bot.sendMessage(msg.from.id, 'Adding the Country...').then(response => {
      addCountryToList(msg.from.id, listId, countryName)
        .then(() =>
          bot.editMessageText(
            { chatId: msg.from.id, messageId: response.message_id },
            `The country ${countryName} was added to the list.`
          )
        )
        .catch(message =>
          bot.editMessageText({ chatId: msg.from.id, messageId: response.message_id }, message)
        );
    });
  });
  bot.on(/^\/latestByCountry ([A-Za-z ]+)$/, (msg, props) =>
    bot
      .sendMessage(msg.from.id, `Getting the latest values for <b>${props.match[1]}</b>...`, {
        parseMode: 'html'
      })
      .then(response =>
        getTelegramLatestByCountry(props.match[1])
          .then(latest =>
            bot.editMessageText(
              { chatId: msg.from.id, messageId: response.message_id },
              parseCovidResults(latest),
              { parseMode: 'html' }
            )
          )
          .catch(err =>
            bot.editMessageText({ chatId: msg.from.id, messageId: response.message_id }, err.message)
          )
      )
  );
  bot.start();
};
