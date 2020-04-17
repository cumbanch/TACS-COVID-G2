const logger = require('../logger');
const axios = require('axios');

function getLastestIso2 (iso2, transfromResponse) {    
    const options = {
        transformResponse : [
            transfromResponse
        ]
    };
    const url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true&iso2=' + iso2;
    return axios.get(url, options);
};

exports.getLastest = (country, transfromResponse) => {
    return getLastestIso2(country.iso2, transfromResponse);
};

exports.getLastestForAll = (countries, transfromResponse) => {
    var promises = countries.map(c => this.getLastest(c, transfromResponse));
    return axios.all(promises);
};

exports.getTimeseriesIso2 = (iso2, transfromResponse) => {
    const options = {
        transformResponse : [
            transfromResponse
        ]
    };
    const url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?onlyCountries=true&iso2=' + iso2;
    return axios.get(url, options);
};

exports.getTimeseries = (country, transfromResponse) => {
    return this.getTimeseriesIso2(country.iso2, transfromResponse);
};

exports.getTimeseriesForAll = (countries, transfromResponse) => {
    var promises = countries.map(c => this.getTimeseries(c, transfromResponse));
    return axios.all(promises);
};

exports.getBrief = () => {
    const url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief';
    return axios.get(url);
};