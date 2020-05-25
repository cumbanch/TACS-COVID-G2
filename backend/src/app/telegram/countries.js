const { getCountryBy } = require('../services/countries');
const { getLatestByIso2 } = require('../services/covid_api');
const { getLatestCountrySerializer } = require('../serializers/countries');

exports.getTelegramLatestByCountry = countryName =>
  getCountryBy({ name: countryName }).then(country => {
    if (country.rows.length) {
      return getLatestByIso2(country.rows[0].dataValues.iso2).then(({ data }) => {
        const latest = getLatestCountrySerializer(data);
        return `Confirmed: <b>${latest.confirmed}</b>\nDeaths: <b>${latest.deaths}</b>\nRecovered: <b>${latest.recovered}</b>`;
      });
    }
    return 'The country was not found';
  });
