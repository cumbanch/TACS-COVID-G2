const { defaultPagination } = require('../../config').server;

exports.pagination = req => ({
  orderColumn: req.query.order_column,
  orderType: req.query.order_type,
  limit: req.query.limit ? parseInt(req.query.limit) : defaultPagination,
  page: req.query.page ? parseInt(req.query.page) : 1
});

exports.idParam = req => ({ id: req.params.id });
