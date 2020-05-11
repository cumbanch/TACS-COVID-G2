const { listPagination } = require('../../config').telegram;
const { getAllList, getListWithCountries, createCountriesByList } = require('../services/lists');
const { getCountryBy } = require('../services/countries');
const { getTelegramBy } = require('../services/telegram');
const { getLatestByList, getTimeseriesByList } = require('../services/covid_api');
const { getHistorySerializer } = require('../serializers/lists');
const { getDatesOfDaysBeforeNow } = require('../utils/moment');

const logger = require('../logger');

exports.getTelegramLists = (chatId, page) =>
  getTelegramBy({ chatId }).then(telegram =>
    getAllList({ userId: telegram.userId, page, limit: listPagination })
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

exports.getTelegramLatestByList = (chatId, listId) =>
  getTelegramBy({ chatId }).then(telegram =>
    getListWithCountries({ id: listId, userId: telegram.userId }).then(list =>
      getLatestByList(list).then(
        latest =>
          `Confirmed: <b>${latest.confirmed}</b>\nDeaths: <b>${latest.deaths}</b>\nRecovered: <b>${latest.recovered}</b>`
      )
    )
  );

exports.getTelegramHistoryByList = (chatId, listId, days) =>
  getTelegramBy({ chatId }).then(telegram =>
    getListWithCountries({ id: listId, userId: telegram.userId }).then(list =>
      getTimeseriesByList(list).then(historyResult => {
        const dates = getDatesOfDaysBeforeNow(days);
        logger.debug(dates);
        /*
        historyResult.forEach(country => {
          country.timeseries.forEach(ts => {});
        });
        */
        logger.debug(historyResult);
        return getHistorySerializer(historyResult);
      })
    )
  );
