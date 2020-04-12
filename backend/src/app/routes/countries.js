const { Router: createRouter } = require('express');

const { getAllCountries } = require('../controllers/countries');

const countryRouter = createRouter();

exports.init = app => {
  app.use('/countries', countryRouter);
  countryRouter.get('/', getAllCountries);
};
