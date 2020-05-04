const { listPagination } = require('../../config').telegram;
const { getAllList, getListWithCountries, createCountriesByList } = require('../services/lists');
const { getCountryBy } = require('../services/countries');
const { getTelegramBy } = require('../services/telegram');
const { getLatestByList } = require('../services/covid_api');
const { invalidCountry } = require('../errors/builders');

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
      throw invalidCountry();
    }
    return getTelegramBy({ chatId }).then(telegram =>
      createCountriesByList({
        id: listId,
        userId: telegram.userId,
        countryId: countries.rows[0].dataValues.id
      })
    );
  });
