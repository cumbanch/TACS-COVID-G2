exports.getPaginationData = ({ total, page = 1, limit = 20 }) => ({
  totalCount: parseInt(total),
  totalPages: Math.ceil(total / limit),
  page,
  limit: parseInt(limit)
});

exports.expectedPaginationKeys = ['data', 'limit', 'page', 'total_count', 'total_pages'];
