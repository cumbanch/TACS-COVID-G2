const { healthCheck } = require('./controllers/health_check');
const authorizationController = require('./controllers/authorization');
const usersController = require('./controllers/users');
var list = require('./controllers/lists');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/signUp', authorizationController.signUp);
  app.post('/login', authorizationController.login);
  
  app.get('/usuarios', usersController.getUsers);
  app.get('/usuarios/:id', usersController.getUser);
  
  app.get('/lists', list.getAll);
  app.post('/lists', list.new);
  app.put('/lists', list.update);
  
  app.get('/lists/:id', list.get);
  app.delete('/lists/:id', list.delete);
  
  app.get('/lists/:id/lastest', list.getLastest);
  app.get('/lists/:id/compare/:offset', list.getCompare);

  app.get('/lists/:id/countries', list.getCountries);
  app.post('/lists/:id/countries', list.update);
  app.delete('/lists/:id/countries/:country_id', list.update);
};
