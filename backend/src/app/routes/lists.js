const { Router: createRouter } = require('express');

const {
  getAllLists,
  createList,
  updateList,
  getList,
  deleteList,
  getCountriesByList,
  createCountriesByList,
  deleteCountriesByList,
  getLastest,
  getHistory
} = require('../controllers/lists');
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

  listRouter.get('/:id/lastest', validateSchemaAndFail(getLatestResultListSchema), getLastest);
  listRouter.get('/:id/history', validateSchemaAndFail(getHistoryResultListSchema), getHistory);

  listRouter.get('/:id/countries', validateSchemaAndFail(getCountriesByListSchema), getCountriesByList);
  listRouter.post('/:id/countries', validateSchemaAndFail(addCountryInListSchema), createCountriesByList);
  listRouter.delete(
    '/:id/countries',
    validateSchemaAndFail(deleteCountryInListSchema),
    deleteCountriesByList
  );
};
