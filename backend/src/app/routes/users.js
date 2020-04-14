const { Router: createRouter } = require('express');

const usersController = require('../controllers/users');

const userRouter = createRouter();

exports.init = app => {
  app.use('/users', userRouter);
  userRouter.get('/', usersController.getUsers);
  userRouter.get('/:id', usersController.getUser);
  userRouter.post('/', usersController.createUser);
};
