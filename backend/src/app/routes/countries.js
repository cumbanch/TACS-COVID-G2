const { Router: createRouter } = require('express');

const { getAllCountries } = require('../controllers/countries');
const { getCountriesSchema } = require('../schemas/countries');
const { validateSchemaAndFail } = require('../middlewares/schema_validator');

const countryRouter = createRouter();

exports.init = app => {
  app.use('/countries', countryRouter);
  countryRouter.get('/', validateSchemaAndFail(getCountriesSchema), getAllCountries);
};
