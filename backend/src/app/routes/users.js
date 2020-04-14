const { Router: createRouter } = require('express');

const usersController = require('../controllers/users');
const { getUsersSchema, createUserSchema, getUserSchema } = require('../schemas/users');
const { validateSchemaAndFail } = require('../middlewares/schema_validator');

const userRouter = createRouter();

exports.init = app => {
  app.use('/users', userRouter);
  userRouter.get('/', validateSchemaAndFail(getUsersSchema), usersController.getUsers);
  userRouter.get('/:id', validateSchemaAndFail(getUserSchema), usersController.getUser);
  userRouter.post('/', validateSchemaAndFail(createUserSchema), usersController.createUser);
};
