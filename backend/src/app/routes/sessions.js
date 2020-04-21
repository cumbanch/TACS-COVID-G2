const { Router: createRouter } = require('express');

const { login, logout, refresh } = require('../controllers/sessions');
const { loginSchema, logoutSchema, refreshSchema } = require('../schemas/sessions');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const { checkTokenAndSetUser } = require('../middlewares/authorization');

const sessionRouter = createRouter();

exports.init = app => {
  app.use('/sessions', sessionRouter);
  sessionRouter.post('/login', validateSchemaAndFail(loginSchema), login);
  sessionRouter.post('/logout', validateSchemaAndFail(logoutSchema), checkTokenAndSetUser, logout);
  sessionRouter.post('/refresh', validateSchemaAndFail(refreshSchema), checkTokenAndSetUser, refresh);
};
