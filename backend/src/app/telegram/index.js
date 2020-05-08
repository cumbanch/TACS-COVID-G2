const TeleBot = require('telebot');
const { chunk } = require('lodash');

const { apiKey } = require('../../config').telegram;
const { getTelegramLogin } = require('../telegram/sessions');
const { getTelegramLists, getTelegramLatestByList, addCountryToList } = require('../telegram/lists');

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

const callbackButtons = {
  latest: {
    action: '/lists/id/latest',
    pagination: '/latest/page'
  },
  addCountry: {
    action: '/lists/id/country/countryName',
    pagination: '/addcountryname/countryName/page'
  }
};

const getListButtons = (msg, page, bot, callbackButton) =>
  getTelegramLists(msg.from.id, page).then(lists => {
    if (lists.count === 0) {
      return msg.reply.text('You dont have any list. Please, create a new list.');
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
    return bot.sendMessage(msg.from.id, messageTitle, { replyMarkup });
  });

exports.telegram = () => {
  const bot = new TeleBot({
    token: apiKey,
    usePlugins: ['commandButton', 'askUser']
  });
  bot.on(['/start', '/help'], msg => msg.reply.text(help));
  bot.on(/^\/login (.+) (.+)$/, (msg, props) => 
    getTelegramLogin(props.match[1], props.match[2], msg.from.id).then(response =>
      msg.reply.text(response)
    )
  );
  bot.on(/^\/latest\/?(\d)?$/, (msg, props) =>
    getListButtons(msg, props.match[1] ? parseInt(props.match[1]) : 1, bot, callbackButtons.latest)
  );
  bot.on(/^\/lists\/(\d)\/latest$/, (msg, props) =>
    getTelegramLatestByList(msg.from.id, parseInt(props.match[1]))
      .then(latest =>
        bot.sendMessage(
          msg.from.id,
          `Confirmed: ${latest.confirmed}, Deaths: ${latest.deaths}, Recovered: ${latest.recovered}`
        )
      )
      .catch(err => bot.sendMessage(msg.from.id, err.message))
  );
  bot.on(/^\/addcountry (.+)\/?(\d)?$/, (msg, props) =>
    getListButtons(msg, props.match[2] ? parseInt(props.match[2]) : 1, bot, {
      action: callbackButtons.addCountry.action.replace('countryName', props.match[1]),
      pagination: callbackButtons.addCountry.pagination.replace('countryName', props.match[1])
    })
  );
  bot.on(/^\/lists\/(\d)\/country\/(.+)$/, (msg, props) => {
    const listId = parseInt(props.match[1]);
    const countryName = props.match[2];
    bot.sendMessage(msg.from.id, 'Adding the Country...').then(re => {
      addCountryToList(msg.from.id, listId, countryName)
        .then(() =>
          bot.editMessageText(
            { chatId: msg.from.id, messageId: re.message_id },
            `The country ${countryName} was added to the list.`
          )
        )
        .catch(err => bot.sendMessage(msg.from.id, err.message));
    });
  });
  bot.start();
};
