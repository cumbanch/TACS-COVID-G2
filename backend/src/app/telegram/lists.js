const { listPagination } = require('../../config').telegram;
const { getAllList, getListWithCountries, createCountriesByList } = require('../services/lists');
const { getCountryBy } = require('../services/countries');
const { getTelegramBy } = require('../services/telegram');
const { getLatestByList } = require('../services/covid_api');

exports.getTelegramLists = (chatId, page) =>
  getTelegramBy({ chatId }).then(telegram =>
    getAllList({ userId: telegram.userId, page, limit: listPagination })
  );

exports.getTelegramLatestByList = (chatId, listId) =>
  getTelegramBy({ chatId }).then(telegram =>
    getListWithCountries({ id: listId, userId: telegram.userId }).then(list => getLatestByList(list))
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
  getTelegramBy({ chatId }).then(telegram =>
    getListWithCountries({ id: listId, userId: telegram.userId })    
  );