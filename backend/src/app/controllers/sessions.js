const { getUserBy } = require('../services/users');
const { notFound } = require('../errors/builders');
const { generateTokens, verifyToken, invalidateToken } = require('../services/sessions');
const { login, refresh } = require('../serializers/sessions');
const { create } = require('../services/tokens_black_list');

exports.login = (req, res, next) =>
  getUserBy({ email: req.body.email, password: req.body.password })
    .then(user => {
      if (!user) throw notFound('User not found');
      return generateTokens({ user, req }).then(([accessToken, idToken, refreshToken]) =>
        res.status(200).send(login({ accessToken, idToken, refreshToken }))
      );
    })
    .catch(next);

exports.logout = (req, res, next) =>
  create({ accessToken: req.headers.authorization })
    .then(() => res.status(204).end())
    .catch(next);

exports.refresh = (req, res, next) =>
  verifyToken({ token: req.body.refresh_token, type: 'refresh', req })
    .then(newAccessToken =>
      invalidateToken({ token: req.headers.authorization }).then(() =>
        res.status(200).send(refresh({ accessToken: newAccessToken, refreshToken: req.body.refresh_token }))
      )
    )
    .catch(next);
