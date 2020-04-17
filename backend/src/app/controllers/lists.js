const {
  getAllList,
  getList,
  deleteList,
  createList,
  updateList,
  getCountriesByList,
  createCountriesByList,
  deleteCountriesByList
} = require('../services/lists');
const { paginateResponse } = require('../serializers/paginations');
const {
  getListsMapper,
  getListMapper,
  deleteListMapper,
  createListMapper,
  updateListMapper,
  getCountriesByListMapper,
  createCountriesByListMapper,
  deleteCountriesByListMapper,
  getHistoryMapper,
  getLatestMapper
} = require('../mappers/lists');
const { notFound } = require('../errors/builders');
const { getListSerializer } = require('../serializers/lists');
const covid_api = require('../services/covid_api')

exports.getAllLists = (req, res, next) => {
  const filters = getListsMapper(req);
  return getAllList(filters)
    .then(({ rows: data, count }) => {
      res.status(200).send(paginateResponse({ data, count, ...filters }));
    })
    .catch(next);
};

exports.getList = (req, res, next) =>
  getList(getListMapper(req))
    .then(list => {
      if (!list) throw notFound('List not found');
      return res.status(200).send(getListSerializer(list));
    })
    .catch(next);

exports.deleteList = (req, res, next) =>
  deleteList(deleteListMapper(req))
    .then(() => res.status(204).end())
    .catch(next);

exports.createList = (req, res, next) => {
  const attributes = createListMapper(req);
  return createList(attributes)
    .then(() => res.status(201).end())
    .catch(next);
};

exports.updateList = (req, res, next) => {
  const newAttributes = updateListMapper(req);
  return updateList(newAttributes)
    .then(() => res.status(204).end())
    .catch(next);
};

exports.getCountriesByList = (req, res, next) => {
  const filters = getCountriesByListMapper(req);
  return getCountriesByList(filters)
    .then(({ rows: data, count }) => res.status(200).send(paginateResponse({ ...filters, data, count })))
    .catch(next);
};

exports.createCountriesByList = (req, res, next) => {
  const params = createCountriesByListMapper(req);
  return createCountriesByList(params)
    .then(() => res.status(201).end())
    .catch(next);
};

exports.deleteCountriesByList = (req, res, next) => {
  const params = deleteCountriesByListMapper(req);
  return deleteCountriesByList(params)
    .then(() => res.status(204).end())
    .catch(next);
};

exports.getLastest = (req, res, next) => {
  const params = getLatestMapper(req);
  getList(params.id)
    .then((list) => {
      covid_api.getLastestForAll(
        list.countries.map(x => x.dataValues), function (data, header) {
          var json = JSON.parse(data);
          var lastest = {
            timestamp: json[0].lastupdate,
            confirmed: json[0].confirmed,
            deaths: json[0].deaths,
            recovered: json[0].recovered
          };
          var country = list.countries.find(c => c.dataValues.iso2 == json[0].countrycode.iso2);
          country.results.push(lastest);
          return country;
        })
        .then(responses => {
          res.status(200).send(list);
        })
        .catch(next);
    })
    .catch(next);
};

exports.getHistory = (req, res, next) => {
  const params = getHistoryMapper(req);
  getList(params.id)
    .then((list) => {
      covid_api.getTimeseriesForAll(
        list.countries.map(x => x.dataValues), function (data, header) {
          var json = JSON.parse(data);
          var history = [];
          for (var date_serie in json[0].timeseries) {
            history.push({
              timestamp: date_serie,
              confirmed: json[0].timeseries[date_serie].confirmed,
              deaths: json[0].timeseries[date_serie].deaths,
              recovered: json[0].timeseries[date_serie].recovered
            });
          }
          var country = list.countries.find(c => c.dataValues.iso2 == json[0].countrycode.iso2);
          country.results.push(history);
          return country;
        })
        .then(responses => {
          res.status(200).send(list);
        })
        .catch(next);
    })
    .catch(next);
};
