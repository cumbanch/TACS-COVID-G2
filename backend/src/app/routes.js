const { healthCheck } = require('./controllers/health_check');
const authorizationController = require('./controllers/authorization');
const usersController = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/signUp', authorizationController.signUp);
  app.post('/login', authorizationController.login);
  app.get('/usuarios', usersController.getUsers);
  app.get('/usuarios/:id', usersController.getUser);
};
