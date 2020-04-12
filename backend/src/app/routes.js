const { healthCheck } = require('./controllers/health_check');
var list = require('./controllers/lists');

exports.init = app => {
  app.get('/health', healthCheck);

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
