exports.getPaginationData = ({ totalUsers, page = 1, limit = 20 }) => ({
  totalCount: totalUsers,
  totalPages: Math.ceil(totalUsers / limit),
  page,
  limit
});
