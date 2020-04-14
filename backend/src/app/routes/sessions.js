const { Router: createRouter } = require('express');

const { login, logout } = require('../controllers/sessions');

const sessionRouter = createRouter();

exports.init = app => {
  app.use('/sessions', sessionRouter);
  sessionRouter.post('/login', login);
  sessionRouter.post('/logout', logout);
};
