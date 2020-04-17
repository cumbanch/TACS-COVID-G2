const { inspect } = require('util');

const logger = require('../logger');
const { moment } = require('../utils/moment');
const {
  User,
  sequelizePackage: { Op }
} = require('../models');
const { deleteUndefined } = require('../utils/objects');
const { databaseError } = require('../errors/builders');

exports.getUsers = params => {
  logger.info(`Attempting to get users with params: ${inspect(params)}`);
  const filters = {
    lastAccess: params.lastAccess && { [Op.gte]: moment(params.lastAccess).format('YYYY-MM-DD') },
    email: params.email && { [Op.iLike]: `%${params.email}%` },
    name: params.name && { [Op.iLike]: `%${params.name}%` },
    lastName: params.lastName && { [Op.iLike]: `%${params.lastName}%` }
  };
  const sequelizeOptions = {
    where: deleteUndefined(filters),
    offset: (params.page - 1) * params.limit,
    limit: params.limit,
    order: params.orderColumn ? [[params.orderColumn, params.orderType || 'ASC']] : undefined
  };
  return User.findAndCountAll(sequelizeOptions).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting users, reason: ${err.message}`);
  });
};

exports.getUser = filters => {
  logger.info(`Attempting to get user with filters: ${inspect(filters)}`);
  return User.findByPk(filters.id).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting a user, reason: ${err.message}`);
  });
};

exports.createUser = attrs => {
  logger.info(`Attempting to create user with attributes: ${inspect(attrs)}`);
  return User.create(attrs).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error creating a user, reason: ${err.message}`);
  });
};
