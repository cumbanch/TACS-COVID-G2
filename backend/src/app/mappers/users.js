const { pagination } = require('./common');

exports.getUsersMapper = req => ({
  ...pagination(req),
  lastAccess: req.query.last_access,
  email: req.query.email,
  name: req.query.name,
  lastName: req.query.last_name
});

exports.getUserMapper = req => ({ id: req.params.id });

exports.createUserMapper = req => ({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password,
  lastName: req.body.last_name
});
