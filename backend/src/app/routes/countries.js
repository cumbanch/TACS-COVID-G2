const { Router: createRouter } = require('express');

const { getAllCountries, getLatestCountry } = require('../controllers/countries');
const {
  getCountriesSchema,
  getLatestCountrySchema
} = require('../schemas/countries');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const { checkTokenAndSetUser } = require('../middlewares/authorization');

const countryRouter = createRouter();

exports.init = app => {
  app.use('/countries', countryRouter);
  countryRouter.get('/', validateSchemaAndFail(getCountriesSchema), checkTokenAndSetUser, getAllCountries);
  countryRouter.get(
    '/:id/latest',
    validateSchemaAndFail(getLatestCountrySchema),
    checkTokenAndSetUser,
    getLatestCountry
  );
};
