const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
const { promisify, inspect } = require('util');

const { moment } = require('../utils/moment');
const {
  expirationUnitAccessToken,
  expirationUnitIdToken,
  expirationUnitRefreshToken,
  expirationValueAccessToken,
  expirationValueIdToken,
  expirationValueRefreshToken,
  secret
} = require('../../config').session;
const logger = require('../logger');
const { invalidToken } = require('../errors/builders');
const { TokenBlackList } = require('../models');

const signPromise = promisify(jwt.sign);
const verifyPromise = promisify(jwt.verify);
const decodePromise = promisify(jwt.decode);

const getIss = req => `${req.protocol}://${req.get('host')}`;

exports.generateTokens = ({ req, user }) => {
  logger.info(`Attempting to generate tokens to user with id: ${user.id}`);
  const iss = getIss(req);
  logger.info('Iss was generated successful');
  const accessPromise = signPromise(
    {
      token_use: 'access',
      admin: user.admin,
      nbf: moment().unix(),
      exp: moment()
        .clone()
        .add(parseInt(expirationValueAccessToken), expirationUnitAccessToken)
        .unix()
    },
    secret,
    {
      issuer: iss,
      jwtid: uuid(),
      subject: `${user.id}`
    }
  );
  const refreshPromise = signPromise(
    {
      token_use: 'refresh',
      nbf: moment().unix(),
      exp: moment()
        .clone()
        .add(expirationValueRefreshToken, expirationUnitRefreshToken)
        .unix()
    },
    secret,
    {
      issuer: iss,
      jwtid: uuid(),
      subject: `${user.id}`
    }
  );
  const idPromise = signPromise(
    {
      token_use: 'id',
      email: user.email,
      first_name: user.name,
      last_name: user.lastName,
      admin: user.admin,
      nbf: moment().unix(),
      exp: moment()
        .clone()
        .add(expirationValueIdToken, expirationUnitIdToken)
        .unix()
    },
    secret,
    {
      issuer: iss,
      jwtid: uuid(),
      subject: `${user.id}`
    }
  );
  return Promise.all([accessPromise, idPromise, refreshPromise]).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error generating the tokens: ${err.message}`);
  });
};

exports.verifyToken = ({ token, type, req }) => {
  logger.info(`Attempting to verify token ${token} generated for the user with id :${req.user.id}`);
  return verifyPromise(token, secret).then(decodedToken => {
    logger.info('Token verified successful');
    if (decodedToken.token_use !== type) throw invalidToken('The provider token is invalid');
    logger.info('Attempting to generate new access token');
    return signPromise(
      {
        token_use: 'access',
        admin: req.user.admin,
        nbf: moment().unix(),
        exp: moment()
          .clone()
          .add(parseInt(expirationValueAccessToken), expirationUnitAccessToken)
          .unix()
      },
      secret,
      {
        issuer: getIss(req),
        jwtid: uuid(),
        subject: `${req.user.id}`
      }
    );
  });
};

exports.invalidateToken = ({ token }) => {
  logger.info(`Attempting to invalidate token ${token}`);
  return TokenBlackList.create({ accessToken: token }).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error invalidating the token: ${err.message}`);
  });
};
