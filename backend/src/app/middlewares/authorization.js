const { verify } = require('jsonwebtoken');
const { promisify } = require('util');

const { secret } = require('../../config').session;
const { invalidToken, notFound } = require('../errors/builders');
const { getTokenBlackListBy } = require('../services/tokens_black_list');
const { getUserByPk } = require('../services/users');

const verifyPromise = promisify(verify);

exports.checkToken = (req, _, next) =>
  getTokenBlackListBy({ accessToken: req.headers.authorization }).then(tokenInvalidated => {
    if (tokenInvalidated) return next(invalidToken('The provider token was invalidated'));
    return verifyPromise(req.headers.authorization, secret)
      .then(decodedToken => {
        if (decodedToken.token_use !== 'access') {
          return next(invalidToken('The provider token is not access token'));
        }
        return getUserByPk({ id: decodedToken.sub }).then(user => {
          if (!user) return next(notFound('User not found'));
          req.user = user.dataValues;
          next();
        });
      })
      .catch(err => next(invalidToken(err.message)));
  });
