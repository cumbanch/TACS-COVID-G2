const { getCountryBy } = require('../services/countries');
const { getLatestByIso2 } = require('../services/covid_api');
const { getLatestCountrySerializer } = require('../serializers/countries');

exports.getTelegramLatestByCountry = countryName =>
  getCountryBy({ name: countryName }).then(country =>
    getLatestByIso2(country).then(({ data }) => getLatestCountrySerializer(data))
  );