const { Router: createRouter } = require('express');

const { getAllLists, createList, updateList, getList, deleteList } = require('../controllers/lists');
const {
  getCountriesByList,
  createCountriesByList,
  deleteCountriesByList,
  getLatest,
  getHistory
} = require('../controllers/countries_by_list');
const {
  getListsSchema,
  createListSchema,
  updateListSchema,
  deleteListSchema,
  getListSchema,
  getLatestResultListSchema,
  getHistoryResultListSchema,
  getCountriesByListSchema,
  addCountryInListSchema,
  deleteCountryInListSchema
} = require('../schemas/lists');
const { validateSchemaAndFail, bodyNotEmpty } = require('../middlewares/params_validator');

const listRouter = createRouter();

exports.init = app => {
  app.use('/lists', listRouter);

  listRouter.get('/', validateSchemaAndFail(getListsSchema), getAllLists);
  listRouter.post('/', validateSchemaAndFail(createListSchema), createList);

  listRouter.put('/:id', [validateSchemaAndFail(updateListSchema), bodyNotEmpty], updateList);
  listRouter.get('/:id', validateSchemaAndFail(getListSchema), getList);
  listRouter.delete('/:id', validateSchemaAndFail(deleteListSchema), deleteList);

  listRouter.get('/:id/latest', validateSchemaAndFail(getLatestResultListSchema), getLatest);
  listRouter.get('/:id/history', validateSchemaAndFail(getHistoryResultListSchema), getHistory);

  listRouter.get('/:id/countries', validateSchemaAndFail(getCountriesByListSchema), getCountriesByList);
  listRouter.post('/:id/countries', validateSchemaAndFail(addCountryInListSchema), createCountriesByList);
  listRouter.delete(
    '/:id/countries',
    validateSchemaAndFail(deleteCountryInListSchema),
    deleteCountriesByList
  );
};
