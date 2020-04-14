const { Router: createRouter } = require('express');

const { getAllLists, createList, updateList, getList, deleteList } = require('../controllers/lists');
const {
  getCountriesByList,
  createCountriesByList,
  deleteCountriesByList,
  getLatest,
  getHistory
} = require('../controllers/countries_by_list');

const listRouter = createRouter();

exports.init = app => {
  app.use('/lists', listRouter);

  listRouter.get('/', getAllLists);
  listRouter.post('/', createList);
  listRouter.put('/:id', updateList);

  listRouter.get('/:id', getList);
  listRouter.delete('/:id', deleteList);

  listRouter.get('/:id/latest', getLatest);
  listRouter.get('/:id/history', getHistory);

  listRouter.get('/:id/countries', getCountriesByList);
  listRouter.post('/:id/countries', createCountriesByList);
  listRouter.delete('/:id/countries', deleteCountriesByList);
};
