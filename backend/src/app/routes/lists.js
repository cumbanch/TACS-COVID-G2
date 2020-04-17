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
const { setUserId } = require('../middlewares/authorization');

const listRouter = createRouter();

exports.init = app => {
  app.use('/lists', listRouter);

  listRouter.get('/', validateSchemaAndFail(getListsSchema), setUserId, getAllLists);
  listRouter.post('/', validateSchemaAndFail(createListSchema), setUserId, createList);

  listRouter.put('/:id', validateSchemaAndFail(updateListSchema), bodyNotEmpty, setUserId, updateList);
  listRouter.get('/:id', validateSchemaAndFail(getListSchema), setUserId, getList);
  listRouter.delete('/:id', validateSchemaAndFail(deleteListSchema), deleteList);

  listRouter.get('/:id/latest', validateSchemaAndFail(getLatestResultListSchema), setUserId, getLatest);
  listRouter.get('/:id/history', validateSchemaAndFail(getHistoryResultListSchema), setUserId, getHistory);

  listRouter.get(
    '/:id/countries',
    validateSchemaAndFail(getCountriesByListSchema),
    setUserId,
    getCountriesByList
  );
  listRouter.post(
    '/:id/countries',
    validateSchemaAndFail(addCountryInListSchema),
    setUserId,
    createCountriesByList
  );
  listRouter.delete(
    '/:id/countries',
    validateSchemaAndFail(deleteCountryInListSchema),
    setUserId,
    deleteCountriesByList
  );
};
