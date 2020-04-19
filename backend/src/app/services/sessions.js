const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

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

const signPromise = promisify(jwt.sign);

exports.generateTokens = ({ user, req }) => {
  const iss = `${req.protocol}://'${req.get('host')}${req.originalUrl}`;
  const accessPromise = jwt.sign({ token_use: 'access', admin: user.admin }, secret, {
    issuer: iss,
    jwtid: uuid(),
    subject: `${user.id}`,
    notBefore: moment().unix(),
    expiresIn: moment()
      .clone()
      .add(expirationValueAccessToken, expirationUnitAccessToken)
      .unix()
  });
  const refreshPromise = signPromise({ token_use: 'refresh' }, secret, {
    issuer: iss,
    jwtid: uuid(),
    subject: `${user.id}`,
    notBefore: moment().unix(),
    expiresIn: moment()
      .clone()
      .add(expirationValueRefreshToken, expirationUnitRefreshToken)
      .unix()
  });
  const idPromise = signPromise(
    {
      token_use: 'id',
      email: user.email,
      first_name: user.name,
      last_name: user.lastName,
      admin: user.admin
    },
    secret,
    {
      issuer: iss,
      jwtid: uuid(),
      subject: `${user.id}`,
      notBefore: moment().unix(),
      expiresIn: moment()
        .clone()
        .add(expirationValueIdToken, expirationUnitIdToken)
        .unix()
    }
  );
  return Promise.all([accessPromise, idPromise, refreshPromise]).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error generating the tokens: ${err.message}`);
  });
};
