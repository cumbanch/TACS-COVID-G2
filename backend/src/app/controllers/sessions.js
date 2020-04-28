const { getUserBy, updateLastAccess } = require('../services/users');
const { notFound, invalidCredentials } = require('../errors/builders');
const { generateTokens, verifyAndCreateToken, comparePassword } = require('../services/sessions');
const { login, refresh } = require('../serializers/sessions');
const { createTokenBlacklist } = require('../services/tokens_black_list');

exports.login = (req, res, next) =>
  getUserBy({ email: req.body.email })
    .then(user => {
      if (!user) throw notFound('User not found');
      return comparePassword(req.body.password, user.password).then(match => {
        if (!match) throw invalidCredentials();
        return generateTokens({ user, req }).then(([accessToken, idToken, refreshToken]) =>
          updateLastAccess(user).then(userUpdated => {
            console.log(userUpdated.dataValues);
            res.status(200).send(login({ accessToken, idToken, refreshToken }));
          })
        );
      });
    })
    .catch(next);

exports.logout = (req, res, next) =>
  createTokenBlacklist({ accessToken: req.headers.authorization })
    .then(() => res.status(204).end())
    .catch(next);

exports.refresh = (req, res, next) =>
  verifyAndCreateToken({ type: 'refresh', req })
    .then(newAccessToken =>
      createTokenBlacklist({ accessToken: req.headers.authorization }).then(() =>
        res.status(200).send(refresh({ accessToken: newAccessToken, refreshToken: req.body.refresh_token }))
      )
    )
    .catch(next);
