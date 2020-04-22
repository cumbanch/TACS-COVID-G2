const { verify } = require('jsonwebtoken');
const { promisify } = require('util');

const { secret } = require('../../config').session;
const { invalidToken, notFound } = require('../errors/builders');
const { getTokenBlacklistBy } = require('../services/tokens_black_list');
const { getUserByPk } = require('../services/users');

const verifyJwtPromise = promisify(verify);

exports.checkTokenAndSetUser = (req, _, next) =>
  getTokenBlacklistBy({ accessToken: req.headers.authorization }).then(tokenInvalidated => {
    if (tokenInvalidated) return next(invalidToken('The provided token was invalidated'));
    return verifyJwtPromise(req.headers.authorization, secret)
      .then(decodedToken => {
        if (decodedToken.token_use !== 'access') {
          return next(invalidToken('The provided token is not an access token'));
        }
        return getUserByPk({ id: decodedToken.sub }).then(user => {
          if (!user) return next(notFound('User not found'));
          req.user = user.dataValues;
          return next();
        });
      })
      .catch(err => next(invalidToken(err.message)));
  });
