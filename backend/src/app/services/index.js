const serviceCovid = require('./covid_api');
const db = require('./database');
const logger = require('../logger');

function getLastestOfCountry(country, callback) {
    serviceCovid.getLastest(country.iso2, (body) => {
        var json = JSON.parse(body);

        var lastest = {
            timestamp: json[0].lastupdate,
            confirmed: json[0].confirmed,
            deaths: json[0].deaths,
            recovered: json[0].recovered
        };

        country.results.push(lastest);

        callback(country);
    });
};

exports.getLastest = (list_id, callback) => {
    var list = db.getList(list_id);

    logger.debug("CORE getLastest " + list_id);

    var promises = list.countries.map((country) => {
        return new Promise((resolve) => {
            getLastestOfCountry(country, resolve);
        });
    });

    Promise.all(promises).then((countries) => {
        list.countries = [];
        list.countries.push(countries);
        logger.debug("CORE getLastest: " + list);
        callback(list);
    });
};