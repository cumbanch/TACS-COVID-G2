exports.setUserId = (req, res, next) => {
  req.userId = 1;
  next();
};
