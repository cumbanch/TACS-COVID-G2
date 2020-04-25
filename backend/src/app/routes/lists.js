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
const { checkTokenAndSetUser } = require('../middlewares/authorization');

const listRouter = createRouter();

exports.init = app => {
  app.use('/lists', listRouter);

  listRouter.get('/', validateSchemaAndFail(getListsSchema), checkTokenAndSetUser, getAllLists);
  listRouter.post('/', validateSchemaAndFail(createListSchema), checkTokenAndSetUser, createList);

  listRouter.put(
    '/:id',
    validateSchemaAndFail(updateListSchema),
    bodyNotEmpty,
    checkTokenAndSetUser,
    updateList
  );
  listRouter.get('/:id', validateSchemaAndFail(getListSchema), checkTokenAndSetUser, getList);
  listRouter.delete('/:id', validateSchemaAndFail(deleteListSchema), checkTokenAndSetUser, deleteList);

  listRouter.get(
    '/:id/latest',
    validateSchemaAndFail(getLatestResultListSchema),
    checkTokenAndSetUser,
    getLatest
  );
  listRouter.get(
    '/:id/history',
    validateSchemaAndFail(getHistoryResultListSchema),
    checkTokenAndSetUser,
    getHistory
  );

  listRouter.get(
    '/:id/countries',
    validateSchemaAndFail(getCountriesByListSchema),
    checkTokenAndSetUser,
    getCountriesByList
  );
  listRouter.post(
    '/:id/countries',
    validateSchemaAndFail(addCountryInListSchema),
    checkTokenAndSetUser,
    createCountriesByList
  );
  listRouter.delete(
    '/:id/countries',
    validateSchemaAndFail(deleteCountryInListSchema),
    checkTokenAndSetUser,
    deleteCountriesByList
  );
};
