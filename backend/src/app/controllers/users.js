exports.getUsers = (_, res) => res.status(200).send({ result: ['pepe', 'eduardo'] });
exports.getUser = (req, res, next) =>
  res.status(200).send({ result: `estas queriendo conseguir el usuario con id ${req.params.id} y es pepe` });
