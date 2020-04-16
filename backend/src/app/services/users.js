const { inspect } = require('util');

const logger = require('../logger');
const { moment } = require('../utils/moment');

const usersMock = [
  {
    dataValues: {
      id: 1,
      name: 'fake',
      email: 'fake@gmail.com',
      password: '$2y$12$sAVFwBobLXpdPOYVc0lvA.InAzmeogdURVxz34C6rJl7WNcJmMFUS',
      lastAccess: moment().format(),
      admin: false,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      deletedAt: null
    }
  },
  {
    dataValues: {
      id: 2,
      name: 'falsy',
      email: 'falsy@gmail.com',
      password: '$2y$12$sAVFwBobLXpdPOYVc0lvA.InAzmeogdURVxz34C6rJl7WNcJmMFUS',
      lastAccess: moment().format(),
      admin: false,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      deletedAt: null
    }
  }
];

exports.getUsers = filters => {
  logger.info(`Attempting to get users with filters: ${inspect(filters)}`);
  return Promise.resolve({
    rows: usersMock,
    count: 2
  });
};

exports.getUser = filters => {
  logger.info(`Attempting to get user with filters: ${inspect(filters)}`);
  return Promise.resolve(usersMock[0]);
};

exports.createUser = attrs => {
  logger.info(`Attempting to create user with attributes: ${inspect(attrs)}`);
  return Promise.resolve(usersMock[1]);
};
