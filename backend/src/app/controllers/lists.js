const logger = require('./../logger');
const service = require('./../services');

exports.getAll = async (req, res) => {
    let ret = {
        lists: [{
            id: 1,
            name: "Prueba",
            registerAt: "2020-01-01",
            countries: [
                {
                    id: 1,
                    name: "Argentina",
                    iso2: "AR",
                    iso3: "ARG",
                    latitude: -34,
                    longitude: -64
                },
                {
                    id: 2,
                    name: "Brazil",
                    iso2: "BR",
                    iso3: "BRA",
                    latitude: -10,
                    longitude: -55
                }
            ]
        },
        {
            id: 2,
            name: "Prueba",
            registerAt: "2020-01-01",
            countries: [
                {
                    id: 2,
                    name: "Brazil",
                    iso2: "BR",
                    iso3: "BRA",
                    latitude: -10,
                    longitude: -55
                },
                {
                    id: 1,
                    name: "Argentina",
                    iso2: "AR",
                    iso3: "ARG",
                    latitude: -34,
                    longitude: -64
                },
                {
                    id: 1,
                    name: "Bolivia",
                    iso2: "BO",
                    iso3: "BOL",
                    latitude: -17,
                    longitude: -65
                }
            ]
        }]
    };

    if (req.query.from != null) {
        logger.debug("CONTROLLER-LISTS: GET lists?from=" + req.query.from);
        //filtered list
    }
    else {
        logger.debug("CONTROLLER-LISTS: GET lists");
        //all
    }

    res.status(200).send(ret)
};

exports.get = async (req, res) => {
    logger.debug("CONTROLLER-LISTS: GET id=" + req.param.id);

    res.status(200).send({
        id: req.param.id,
        name: "Prueba",
        registerAt: "2020-01-01",
        countries: [
            {
                id: 1,
                name: "Argentina",
                iso2: "AR",
                iso3: "ARG",
                latitude: -34,
                longitude: -64
            },
            {
                id: 2,
                name: "Brazil",
                iso2: "BR",
                iso3: "BRA",
                latitude: -10,
                longitude: -55
            }
        ]
    });

    //res.status(404).send();
};

exports.getLastest = async (req, res) => {
    logger.debug(`CONTROLLER-LISTS: GET Lastest list_id=${req.params.id}`);
    service.getLastest(req.params.id, (list) => res.status(200).send(list));
    //res.status(404).send();
};

exports.getCompare = async (req, res) => {
    logger.debug("CONTROLLER-LISTS: GET Compare list_id=" + req.param.id + " with Offset=" + req.param.offset);

    res.status(200).send({
        id: req.param.id,
        name: "Prueba",
        registerAt: "2020-01-01",
        countries: [
            {
                id: 1,
                name: "Argentina",
                iso2: "AR",
                iso3: "ARG",
                latitude: -34,
                longitude: -64,
                results: [
                    {
                        day: 1,
                        timestamp: "2020-04-09T20:42:00.009Z",
                        confirmed: 1736,
                        deaths: 76,
                        recovered: 280
                    },
                    {
                        day: 2,
                        timestamp: "2020-04-10T20:42:00.009Z",
                        confirmed: 1885,
                        deaths: 79,
                        recovered: 325
                    },
                    {
                        day: 3,
                        timestamp: "2020-04-11T20:42:00.009Z",
                        confirmed: 1975,
                        deaths: 82,
                        recovered: 375
                    }
                ]
            },
            {
                id: 2,
                name: "Brazil",
                iso2: "BR",
                iso3: "BRA",
                latitude: -10,
                longitude: -55,
                results: [
                    {
                        day: 1,
                        timestamp: "2020-04-09T20:42:00.009Z",
                        confirmed: 15360,
                        deaths: 852,
                        recovered: 112
                    },
                    {
                        day: 2,
                        timestamp: "2020-04-10T20:42:00.009Z",
                        confirmed: 17578,
                        deaths: 932,
                        recovered: 135
                    },
                    {
                        day: 3,
                        timestamp: "2020-04-11T20:42:00.009Z",
                        confirmed: 19638,
                        deaths: 1057,
                        recovered: 173
                    }
                ]
            }
        ]
    });

    //res.status(404).send();
};

exports.new = async (req, res) => {

    logger.debug("CONTROLLER-LISTS: NEW list - name=" + req.body.name);

    res.status(201).send({
        id: 1,
        name: req.body.name,
        registerAt: "2020-01-01",
        countries: [
            {
                id: 1,
                name: "Argentina",
                iso2: "AR",
                iso3: "ARG",
                latitude: -34,
                longitude: -64
            },
            {
                id: 2,
                name: "Brazil",
                iso2: "BR",
                iso3: "BRA",
                latitude: -10,
                longitude: -55
            }
        ]
    });
};

exports.update = async (req, res) => {

    logger.debug("CONTROLLER-LISTS: UPDATE list - name=" + req.body.name);

    res.status(200).send({
        id: req.param.id,
        name: "Prueba",
        registerAt: "2020-01-01",
        countries: [
            {
                id: 1,
                name: "Argentina",
                iso2: "AR",
                iso3: "ARG",
                latitude: -34,
                longitude: -64
            },
            {
                id: 2,
                name: "Brazil",
                iso2: "BR",
                iso3: "BRA",
                latitude: -10,
                longitude: -55
            }
        ]
    });
};

exports.delete = async (req, res) => {
    logger.debug("CONTROLLER-LISTS: DELETE list_id=" + req.param.id);

    res.status(204).send();
    //res.status(404).send();
};

exports.getCountries = async (req, res) => {
    logger.debug("CONTROLLER-LISTS: GET countries from list_id=" + req.param.id);

    res.status(200).send({
        countries: [
            {
                id: 1,
                name: "Argentina",
                iso2: "AR",
                iso3: "ARG",
                latitude: -34,
                longitude: -64
            },
            {
                id: 2,
                name: "Brazil",
                iso2: "BR",
                iso3: "BRA",
                latitude: -10,
                longitude: -55
            }
        ]
    });

    //res.status(404).send();
};

exports.addCountry = async (req, res) => {
    logger.debug("CONTROLLER-LISTS: ADD country_id=" + req.body.country_id + " to list_id=" + req.param.id);

    res.status(201).send({
        countries: [
            {
                id: 1,
                name: "Argentina",
                iso2: "AR",
                iso3: "ARG",
                latitude: -34,
                longitude: -64
            },
            {
                id: 2,
                name: "Brazil",
                iso2: "BR",
                iso3: "BRA",
                latitude: -10,
                longitude: -55
            }
        ]
    });

    //res.status(404).send();
};

exports.deleteCountry = async (req, res) => {
    logger.debug("CONTROLLER-LISTS: DELETE country_id=" + req.param.country_id + " to list_id=" + req.param.id);

    res.status(200).send();

    //res.status(404).send();
};
