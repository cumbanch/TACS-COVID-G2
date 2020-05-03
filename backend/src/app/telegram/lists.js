const { listPagination } = require('../../config').telegram;
const { getAllList, getListWithCountries } = require('../services/lists');
const { getTelegramBy } = require('../services/telegram');
const { getLatestByList } = require('../services/covid_api');

exports.getTelegramLists = (chatId, page) =>
  getTelegramBy({ chatId })
    .then(telegram => getAllList({ userId: telegram.userId, page, limit: listPagination })
    );

exports.getTelegramLatestByList = (chatId, listId) =>
  getTelegramBy({ chatId })
    .then(telegram => getListWithCountries({ id: listId, userId: telegram.userId })
      .then(list => getLatestByList(list))
    );
