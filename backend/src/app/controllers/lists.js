const {
  getAllList,
  getList,
  deleteList,
  createList,
  updateList,
  getCountriesByList,
  createCountriesByList,
  deleteCountriesByList,
  getCountriesByListBy
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
  return getCountriesByListBy(params)
    .then(() =>
      res.status(200).send({
        confirmed: 1975,
        deaths: 82,
        recovered: 375
      })
    )
    .catch(next);
};

exports.getHistory = (req, res, next) => {
  const params = getHistoryMapper(req);
  return getCountriesByListBy(params)
    .then(() =>
      res.status(200).send([
        {
          name: 'Argentina',
          iso2: 'AR',
          iso3: 'ARG',
          latitude: '78.46668',
          longitude: '-33.44844',
          history: [{ '22-01-2020': { confirmed: 14, deaths: 0, recovered: 0 } }]
        },
        {
          name: 'Brasil',
          iso2: 'BR',
          iso3: 'BRA',
          latitude: '71.46668',
          longitude: '-28.44844',
          history: [{ '22-01-2020': { confirmed: 79, deaths: 0, recovered: 0 } }]
        }
      ])
    )
    .catch(next);
};
