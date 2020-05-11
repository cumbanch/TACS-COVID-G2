const { listPagination } = require('../../config').telegram;
const { getAllList, getListWithCountries, createCountriesByList } = require('../services/lists');
const { getCountryBy } = require('../services/countries');
const { getTelegramBy } = require('../services/telegram');
const { getLatestByList, getTimeseriesByList } = require('../services/covid_api');
const { getHistorySerializer } = require('../serializers/lists');
const { isInXDaysBeforeRange } = require('../utils/moment');
const { notFound } = require('../errors/builders');

exports.getTelegramLists = (chatId, page) =>
  getTelegramBy({ chatId }).then(telegram =>
    getAllList({ userId: telegram.userId, page, limit: listPagination })
  );

exports.getTelegramLatestByList = (chatId, listId) =>
  getTelegramBy({ chatId }).then(telegram =>
    getListWithCountries({ id: listId, userId: telegram.userId }).then(list => getLatestByList(list))
  );

exports.getTelegramHistoryByList = (chatId, listId, days) =>
  getTelegramBy({ chatId }).then(telegram =>
    getListWithCountries({ id: listId, userId: telegram.userId })
      .then(list => {
        if (!list) throw notFound('List not found');
        return getTimeseriesByList(list).then(historyResult =>
          getHistorySerializer(historyResult).then(historySerilized =>
            historySerilized.find(h => isInXDaysBeforeRange(h[0], days))
          )
        );
      })
  );

exports.addCountryToList = (chatId, listId, countryName) =>
  getCountryBy({ name: countryName }).then(countries => {
    if (countries.count === 0) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('The provided country is invalid');
    }
    return getTelegramBy({ chatId }).then(telegram =>
      createCountriesByList({
        id: listId,
        userId: telegram.userId,
        countryId: countries.rows[0].dataValues.id
      })
    );
  });

exports.getTelegramListWithCountries = (chatId, listId) =>
  getTelegramBy({ chatId }).then(telegram => getListWithCountries({ id: listId, userId: telegram.userId }));
