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
  getLatest,
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
const { checkToken } = require('../middlewares/authorization');

const listRouter = createRouter();

exports.init = app => {
  app.use('/lists', listRouter);

  listRouter.get('/', validateSchemaAndFail(getListsSchema), checkToken, getAllLists);
  listRouter.post('/', validateSchemaAndFail(createListSchema), checkToken, createList);

  listRouter.put('/:id', validateSchemaAndFail(updateListSchema), bodyNotEmpty, checkToken, updateList);
  listRouter.get('/:id', validateSchemaAndFail(getListSchema), checkToken, getList);
  listRouter.delete('/:id', validateSchemaAndFail(deleteListSchema), checkToken, deleteList);

  listRouter.get('/:id/latest', validateSchemaAndFail(getLatestResultListSchema), checkToken, getLatest);
  listRouter.get('/:id/history', validateSchemaAndFail(getHistoryResultListSchema), checkToken, getHistory);

  listRouter.get(
    '/:id/countries',
    validateSchemaAndFail(getCountriesByListSchema),
    checkToken,
    getCountriesByList
  );
  listRouter.post(
    '/:id/countries',
    validateSchemaAndFail(addCountryInListSchema),
    checkToken,
    createCountriesByList
  );
  listRouter.delete(
    '/:id/countries',
    validateSchemaAndFail(deleteCountryInListSchema),
    checkToken,
    deleteCountriesByList
  );
};
