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

/*
exports.getTimeseries = async (countryIso2) => {
    var options = {
        'method': 'GET',
        'url': 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=' + countryIso2,
        'headers': {
        }
    };

    request(options, function (error, response) {
        if (error)
        {
            logger.error(error);
            throw new Error(error);
        }

        if (response.statusCode == 200)
        {
            logger.debug("COVID API: " + options.url);
            logger.debug("COVID API: " + response.body);
            return response.body;
        }
    });
};

exports.getBrief = async () => {
    var options = {
        'method': 'GET',
        'url': 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief',
        'headers': {
        }
    };

    request(options, function (error, response) {
        if (error)
        {
            logger.error(error);
            throw new Error(error);
        }

        if (response.statusCode == 200)
        {
            logger.debug("COVID API: " + options.url);
            logger.debug("COVID API: " + response.body);
            return response.body;
        }
    });
};
*/