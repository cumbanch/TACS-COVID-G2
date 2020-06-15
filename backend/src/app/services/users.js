const { inspect } = require('util');

const logger = require('../logger');
const { moment } = require('../utils/moment');
const {
  User,
  sequelizePackage: { Op },
  Country
} = require('../models');
const { deleteUndefined } = require('../utils/objects');
const { databaseError, alreadyExist, internalServerError, notFound } = require('../errors/builders');
const { hashPassword } = require('./sessions');
const { omit } = require('../utils/lodash');

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
    /* istanbul ignore next */
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
  return hashPassword(attrs.password)
    .then(hash =>
      User.findCreateFind({ where: { email: attrs.email }, defaults: { ...attrs, password: hash } })
        .catch(err => {
          /* istanbul ignore next */
          logger.error(inspect(err));
          /* istanbul ignore next */
          throw databaseError(`Error creating a user, reason: ${err.message}`);
        })
        .then(([instance, created]) => {
          if (!created) throw alreadyExist('User already exist');
          return instance;
        })
    )
    .catch(err => {
      /* istanbul ignore next */
      logger.error(inspect(err));
      /* istanbul ignore next */
      throw internalServerError(err.message);
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

exports.updateUser = ({ instance, attributes }) => {
  logger.info(`Attempting to update user with id: ${instance.id}`);
  return instance.update(attributes).catch(err => {
    /* istanbul ignore next */
    logger.error(inspect(err));
    /* istanbul ignore next */
    throw databaseError(`Error updating a user, reason: ${err.message}`);
  });
};

exports.updateLastAccess = instance =>
  this.updateUser({ instance, attributes: { lastAccess: moment().format() } });

exports.getUserWithLists = ({ id }) =>
  this.getUserByPk({ id }).then(user => {
    if (!user) throw notFound('User not found');
    return user
      .getUserList({ include: [{ model: Country, as: 'countries' }] })
      .then(lists => {
        const countriesByList = lists.map(({ countries, dataValues }) => ({
          dataValues: { ...omit(dataValues, ['countries']), countriesAmount: countries.length }
        }));
        return { ...user, lists: countriesByList };
      })
      .catch(err => {
        /* istanbul ignore next */
        logger.error(inspect(err));
        /* istanbul ignore next */
        throw databaseError(`Error getting user with lists, reason: ${err.message}`);
      });
  });

exports.findOrCreateUser = ({ email, name, lastName }) =>
  User.findOrCreate({ where: { email }, defaults: { email, name, lastName, external: true } }).catch(err => {
    /* istanbul ignore next */
    logger.error(inspect(err));
    /* istanbul ignore next */
    throw databaseError(`Error finding or creating the user, reason: ${err.message}`);
  });
