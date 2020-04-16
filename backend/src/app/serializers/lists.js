const { objectToSnakeCase } = require('../utils/objects');
const { getCountrySerializer } = require('./countries');

exports.getListSerializer = list => {
    list.countries = getCountrySerializer(list.countries.map(country => country.dataValues));
    return objectToSnakeCase(list.dataValues);
};
