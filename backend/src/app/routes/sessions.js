const { Router: createRouter } = require('express');

const { login, logout } = require('../controllers/sessions');
const { loginSchema, logoutSchema } = require('../schemas/sessions');
const { validateSchemaAndFail } = require('../middlewares/schema_validator');

const sessionRouter = createRouter();

exports.init = app => {
  app.use('/sessions', sessionRouter);
  sessionRouter.post('/login', validateSchemaAndFail(loginSchema), login);
  sessionRouter.post('/logout', validateSchemaAndFail(logoutSchema), logout);
};
