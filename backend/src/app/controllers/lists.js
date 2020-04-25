const { getLatestByList, getTimeseriesByList } = require('../services/covid_api');
const {
  getAllList,
  getList,
  deleteList,
  createList,
  updateList,
  getCountriesByList,
  createCountriesByList,
  deleteCountriesByList,
  getListWithCountries
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
const { getListSerializer, getHistorySerializer } = require('../serializers/lists');

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
  return getListWithCountries(params)
    .then(list => {
      if (!list) throw notFound('List not found');
      return getLatestByList(list).then(latestResult =>
        res.status(200).send(
          latestResult || {
            confirmed: 0,
            deaths: 0,
            recovered: 0
          }
        )
      );
    })
    .catch(next);
};

exports.getHistory = (req, res, next) => {
  const params = getHistoryMapper(req);
  return getListWithCountries(params)
    .then(list => {
      if (!list) throw notFound('List not found');
      return getTimeseriesByList(list).then(historyResult => {
        res.status(200).send(getHistorySerializer(historyResult));
      });
    })
    .catch(next);
};
