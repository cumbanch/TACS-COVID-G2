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
const { invalidToken, databaseError } = require('../errors/builders');

const signJwtPromise = promisify(jwt.sign);
const verifyJwtPromise = promisify(jwt.verify);

const getIss = req => `${req.protocol}://${req.get('host')}`;

exports.generateTokens = ({ req, user }) => {
  logger.info(`Attempting to generate tokens for the user with id: ${user.id}`);
  const iss = getIss(req);
  logger.info('Iss was generated successfully');
  const accessPromise = signJwtPromise(
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
  const refreshPromise = signJwtPromise(
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
  const idPromise = signJwtPromise(
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

exports.verifyAndCreateToken = ({ type, req }) => {
  logger.info(
    `Attempting to verify token ${req.body.refresh_token} generated for the user with id :${req.user.id}`
  );
  return verifyJwtPromise(req.body.refresh_token, secret)
    .then(decodedToken => {
      logger.info('Token verified successful');
      if (decodedToken.token_use !== type) throw invalidToken('The provider token is invalid');
      logger.info('Attempting to generate new access token');
      return signJwtPromise(
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
    })
    .catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error generating the token: ${err.message}`);
    });
};
