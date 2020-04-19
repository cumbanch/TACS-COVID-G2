const { Router: createRouter } = require('express');

const { getAllCountries } = require('../controllers/countries');
const { getCountriesSchema } = require('../schemas/countries');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const { checkToken } = require('../middlewares/authorization');

const countryRouter = createRouter();

exports.init = app => {
  app.use('/countries', countryRouter);
  countryRouter.get('/', validateSchemaAndFail(getCountriesSchema), checkToken, getAllCountries);
};
