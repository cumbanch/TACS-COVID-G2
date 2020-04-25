const { inspect } = require('util');

const logger = require('../logger');
const { moment } = require('../utils/moment');
const {
  User,
  sequelizePackage: { Op }
} = require('../models');
const { deleteUndefined } = require('../utils/objects');
const { databaseError, alreadyExist } = require('../errors/builders');

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
    /* istanbul ignore next */
    logger.error(inspect(err));
    throw databaseError(`Error getting users, reason: ${err.message}`);
  });
};

exports.getUserByPk = ({ id }) => {
  logger.info(`Attempting to get user with pk: ${inspect(id)}`);
  return User.findByPk(id).catch(err => {
    /* istanbul ignore next */
    logger.error(inspect(err));
    /* istanbul ignore next */
    throw databaseError(`Error getting a user, reason: ${err.message}`);
  });
};

exports.createUser = attrs => {
  logger.info(`Attempting to create user with attributes: ${inspect(attrs)}`);
  return User.findCreateFind({ where: { email: attrs.email }, defaults: attrs })
    .catch(err => {
      /* istanbul ignore next */
      logger.error(inspect(err));
      /* istanbul ignore next */
      throw databaseError(`Error creating a user, reason: ${err.message}`);
    })
    .then(([instance, created]) => {
      if (!created) throw alreadyExist('User already exist');
      return instance;
    });
};

exports.getUserBy = filters => {
  logger.info(`Attempting to get user with filters: ${inspect(filters)}`);
  return User.findOne({ where: filters }).catch(err => {
    /* istanbul ignore next */
    logger.error(inspect(err));
    /* istanbul ignore next */
    throw databaseError(`Error getting a user, reason: ${err.message}`);
  });
};
