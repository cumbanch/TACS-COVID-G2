exports.setUserId = (req, res, next) => {
  req.headers.user_id = 1;
  next();
};