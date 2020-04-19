const axios = require('axios');

const logger = require('../logger');
const {
    baseUrl,
    timeserieEndpoint,
    latestEndpoint,
    briefEndpoint
} = require('../../config').covidApi;

getCovidServiceLatestIso2 = (iso2, transfromResponse) => {
    const options = {
        transformResponse: [
            transfromResponse
        ]
    };
    const url = `${baseUrl}${latestEndpoint}${iso2}`;
    return axios.get(url, options);
};

exports.getCovidServiceLatest = (country, transfromResponse) => getCovidServiceLatestIso2(country.dataValues.iso2, transfromResponse);

exports.getCovidServiceLatestForAll = (list) => {
    const promises = list.countries.map(country => this.getCovidServiceLatest(country, (data) => {
        const json = JSON.parse(data);
        const country = list.countries.find(x => x.dataValues.iso2 == json[0].countrycode.iso2);
        country.latest = {
            lastUpdate: json[0].lastupdate,
            confirmed: json[0].confirmed,
            deaths: json[0].deaths,
            recovered: json[0].recovered
        };
    }));

    return axios.all(promises)
    .then(() => 
        list.latest = {
            lastUpdate: list.countries.reduce((a, b) => a < b.latest.lastUpdate ? a : b.latest.lastUpdate),
            confirmed: list.countries.reduce((a, b) => a + b.latest.confirmed, 0),
            deaths: list.countries.reduce((a, b) => a + b.latest.deaths, 0),
            recovered: list.countries.reduce((a, b) => a + b.latest.recovered, 0)
        });
};

getCovidServiceTimeseriesIso2 = (iso2, transfromResponse) => {
    const options = {
        transformResponse: [
            transfromResponse
        ]
    };
    const url = `${baseUrl}${timeserieEndpoint}${iso2}`;
    return axios.get(url, options);
};

exports.getCovidServiceTimeseries = (country, transfromResponse) => getCovidServiceTimeseriesIso2(country.dataValues.iso2, transfromResponse);

exports.getCovidServiceTimeseriesForAll = (list) => {
    const promises = list.countries.map(country => this.getCovidServiceTimeseries(country, (data) => {
        const json = JSON.parse(data);
        /*
        Esto queda comentado hasta que definamos que control usar para graficar en el frontend

        var history = [];
        json[0].timeseries.forEach(date_serie => {
          history.push({
            timestamp: date_serie,
            confirmed: json[0].timeseries[date_serie].confirmed,
            deaths: json[0].timeseries[date_serie].deaths,
            recovered: json[0].timeseries[date_serie].recovered
          });
        }
        */
        const country = list.countries.find(x => x.dataValues.iso2 == json[0].countrycode.iso2);
        country.timeseries = json[0].timeseries;
    }));
    return axios.all(promises);
};

exports.getCovidServiceBrief = () => {
    const url = `${baseUrl}${briedEndpoint}`;;
    return axios.get(url);
};
