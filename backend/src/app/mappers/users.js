const { pagination } = require('./common');

exports.getUsersMapper = req => ({ ...pagination(req) });

exports.getUserMapper = req => ({ id: req.params.id });

exports.createUserMapper = req => ({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
});
