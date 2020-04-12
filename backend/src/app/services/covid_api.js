const logger = require('./../logger');
var request = require('request');

exports.getLastest = (countryIso2, callback) => {
    var options = {
        'method': 'GET',
        'url': 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true&iso2=' + countryIso2,
        'headers': {
        }
    };

    request(options, function (error, response, body) {
        if (error)
        { 
            logger.error(error);
            throw new Error(error);
        }

        if (response.statusCode == 200)
        {
            logger.debug("COVID API: " + options.url);
            logger.debug("COVID API: " + body);
            callback(body);
        }
    });
};

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