const { listPagination } = require('../../config').telegram;
const { getAllList, getListWithCountries, createCountriesByList } = require('../services/lists');
const { getCountryBy } = require('../services/countries');
const { getTelegramBy } = require('../services/telegram');
const { getLatestByList, getTimeseriesByList } = require('../services/covid_api');
const { getHistorySerializer } = require('../serializers/lists');
const { moment } = require('../utils/moment');
const { getPropertyName, getPropertyValue } = require('../utils/objects');

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
        const historySerialized = getHistorySerializer(historyResult);
        const historyParsed = {};

        historySerialized.forEach(country =>
          country.timeseries
            .filter(timeserie => moment(timeserie.date) >= moment().subtract(days, 'days'))
            .forEach(timeserie => {
              if (!historyParsed[timeserie.date]) {
                historyParsed[timeserie.date] = { confirmed: [], deaths: [], recovered: [] };
              }
              historyParsed[timeserie.date].confirmed.push({
                [country.name]: timeserie.confirmed ? timeserie.confirmed : 0
              });
              historyParsed[timeserie.date].deaths.push({
                [country.name]: timeserie.deaths ? timeserie.deaths : 0
              });
              historyParsed[timeserie.date].recovered.push({
                [country.name]: timeserie.recovered ? timeserie.recovered : 0
              });
            })
        );

        let historyTexted = '';

        // eslint-disable-next-line guard-for-in
        for (const date in historyParsed) {
          historyTexted += `<b>${moment(date).format('M/D/YY')}</b>:\n\tConfirmed:\n${historyParsed[
            date
          ].confirmed
            .map(
              countryConfirmed =>
                `\t\t\t\t${getPropertyName(countryConfirmed, 0)}: <b>${getPropertyValue(
                  countryConfirmed,
                  0
                )}</b>`
            )
            .join('\n')}\n\tDeaths:\n${historyParsed[date].deaths
            .map(
              countryDeaths =>
                `\t\t\t\t${getPropertyName(countryDeaths, 0)}: <b>${getPropertyValue(countryDeaths, 0)}</b>`
            )
            .join('\n')}\n\tRecovered:\n${historyParsed[date].recovered
            .map(
              countryRecovered =>
                `\t\t\t\t${getPropertyName(countryRecovered, 0)}: <b>${getPropertyValue(
                  countryRecovered,
                  0
                )}</b>`
            )
            .join('\n')}\n`;
        }

        return historyTexted;
      })
    )
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
