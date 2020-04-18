const axios = require('axios');

const logger = require('../logger');
const { 
    baseUrl, 
    timeserieEndpoint,
    latestEndpoint, 
    briefEndpoint 
} = require('../../config').covidApi;

function getCovidServiceLatestIso2 (iso2, transfromResponse) {    
    const options = {
        transformResponse : [
            transfromResponse
        ]
    };
    const url = `${baseUrl}${latestEndpoint}${iso2}`;
    console.log(url);
    return axios.get(url, options);
};

exports.getCovidServiceLatest = (country, transfromResponse) => {
    return getCovidServiceLatestIso2(country.iso2, transfromResponse);
};

exports.getCovidServiceLatestForAll = (countries, transfromResponse) => {
    const promises = countries.map(country => this.getCovidServiceLatest(country, transfromResponse));
    return axios.all(promises);
};

function getCovidServiceTimeseriesIso2(iso2, transfromResponse) {
    const options = {
        transformResponse : [
            transfromResponse
        ]
    };
    const url = baseUrl + timeserieEndpoint + `${iso2}`;
    return axios.get(url, options);
};

exports.getCovidServiceTimeseries = (country, transfromResponse) => {
    return getCovidServiceTimeseriesIso2(country.iso2, transfromResponse);
};

exports.getCovidServiceTimeseriesForAll = (countries, transfromResponse) => {
    const promises = countries.map(country => this.getCovidServiceTimeseries(country, transfromResponse));
    return axios.all(promises);
};

exports.getCovidServiceBrief = () => {
    const url = baseUrl + briefEndpoint;
    return axios.get(url);
};
