const countryRoute = require('./countries');
const listRoute = require('./lists');
const userRoute = require('./users');
const sessionRoute = require('./sessions');
const { healthCheck } = require('../controllers/health_check');

exports.init = app => {
  app.get('/health', healthCheck);
  const routes = [countryRoute, listRoute, userRoute, sessionRoute];
  routes.forEach(route => route.init(app));
};
