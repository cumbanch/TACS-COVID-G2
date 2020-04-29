const { Router: createRouter } = require('express');

const usersController = require('../controllers/users');
const { getUsersSchema, createUserSchema, getUserSchema } = require('../schemas/users');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const { checkTokenAndSetUser, checkPermissions } = require('../middlewares/authorization');

const userRouter = createRouter();

exports.init = app => {
  app.use('/users', userRouter);
  userRouter.get(
    '/',
    validateSchemaAndFail(getUsersSchema),
    checkTokenAndSetUser,
    checkPermissions,
    usersController.getUsers
  );
  userRouter.get(
    '/:id',
    validateSchemaAndFail(getUserSchema),
    checkTokenAndSetUser,
    checkPermissions,
    usersController.getUser
  );
  userRouter.post('/', validateSchemaAndFail(createUserSchema), usersController.createUser);
};
