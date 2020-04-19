const { getUserBy } = require('../services/users');
const { notFound } = require('../errors/builders');
const { generateTokens } = require('../services/sessions');
const { login } = require('../serializers/sessions');

exports.login = (req, res, next) =>
  getUserBy({ email: req.body.email, password: req.body.password })
    .then(user => {
      if (!user) throw notFound('User not found');
      return generateTokens({ user, req }).then(([accessToken, idToken, refreshToken]) =>
        res.status(200).send(login({ accessToken, idToken, refreshToken }))
      );
    })
    .catch(next);

exports.logout = (_, res) => res.status(204).end();
