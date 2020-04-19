const {
  getCovidServiceLatestForAll,
  getCovidServiceTimeseriesForAll
} = require('../services/covid_api');
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

exports.getLatest = (req, res, next) => {
  const params = getLatestMapper(req);
  return getList(params.id)
    .then((list) =>
      getCovidServiceLatestForAll(list)
        .then(() => {
          res.status(200).send(list);
        })
    )
    .catch(next);
};

exports.getHistory = (req, res, next) => {
  const params = getHistoryMapper(req);
  return getList(params.id)
    .then((list) =>
      getCovidServiceTimeseriesForAll(list)
        .then(() => {
          res.status(200).send(list);
        })
    )
    .catch(next);
};
