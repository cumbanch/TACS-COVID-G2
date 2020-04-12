const { getUsers, getUser, createUser } = require('../services/users');
const { getUsersMapper, getUserMapper, createUserMapper } = require('../mappers/users');
const { paginateResponse } = require('../serializers/paginations');
const { getUserSerializer } = require('../serializers/users');
const { notFound } = require('../errors/builders');

exports.getUsers = (req, res, next) => {
  const filters = getUsersMapper(req);
  return getUsers(filters)
    .then(({ count, rows }) => res.status(200).send(paginateResponse({ ...filters, count, data: rows })))
    .catch(next);
};

exports.getUser = (req, res, next) =>
  getUser(getUserMapper(req))
    .then(user => {
      if (!user) throw notFound('User not found');
      return res.status(200).send(getUserSerializer(user));
    })
    .catch(next);

exports.createUser = (req, res, next) =>
  createUser(createUserMapper(req))
    .then(() => res.status(201).end())
    .catch(next);
