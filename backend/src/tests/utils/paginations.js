exports.getPaginationData = ({ total, page = 1, limit = 20 }) => ({
  totalCount: total,
  totalPages: Math.ceil(total / limit),
  page,
  limit
});

exports.expectedPaginationKeys = ['data', 'limit', 'page', 'total_count', 'total_pages'];
