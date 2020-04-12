const logger = require('./../logger');
const { getAllList, getList, deleteList, createList, updateList } = require('../services/lists');
const { paginateResponse } = require('../serializers/paginations');
const {
  getListsMapper,
  getListMapper,
  deleteListMapper,
  createListMapper,
  updateListMapper
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

exports.getCompare = (req, res) => {
  logger.debug(`CONTROLLER-LISTS: GET Compare list_id=${req.param.id} with Offset=${req.param.offset}`);

  res.status(200).send({
    id: req.param.id,
    name: 'Prueba',
    registerAt: '2020-01-01',
    countries: [
      {
        id: 1,
        name: 'Argentina',
        iso2: 'AR',
        iso3: 'ARG',
        latitude: -34,
        longitude: -64,
        results: [
          {
            day: 1,
            timestamp: '2020-04-09T20:42:00.009Z',
            confirmed: 1736,
            deaths: 76,
            recovered: 280
          },
          {
            day: 2,
            timestamp: '2020-04-10T20:42:00.009Z',
            confirmed: 1885,
            deaths: 79,
            recovered: 325
          },
          {
            day: 3,
            timestamp: '2020-04-11T20:42:00.009Z',
            confirmed: 1975,
            deaths: 82,
            recovered: 375
          }
        ]
      },
      {
        id: 2,
        name: 'Brazil',
        iso2: 'BR',
        iso3: 'BRA',
        latitude: -10,
        longitude: -55,
        results: [
          {
            day: 1,
            timestamp: '2020-04-09T20:42:00.009Z',
            confirmed: 15360,
            deaths: 852,
            recovered: 112
          },
          {
            day: 2,
            timestamp: '2020-04-10T20:42:00.009Z',
            confirmed: 17578,
            deaths: 932,
            recovered: 135
          },
          {
            day: 3,
            timestamp: '2020-04-11T20:42:00.009Z',
            confirmed: 19638,
            deaths: 1057,
            recovered: 173
          }
        ]
      }
    ]
  });

  // res.status(404).send();
};
