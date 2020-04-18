const { corsWhitelist } = require('../../config').server;

exports.configurateCors = (req, res, next) => {
  res.append('Access-Control-Allow-Origin', corsWhitelist);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
