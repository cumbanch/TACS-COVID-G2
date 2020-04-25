const { objectToSnakeCase } = require('../utils/objects');

exports.getListSerializer = list => objectToSnakeCase(list.dataValues);

exports.getHistorySerializer = timeseriesResults =>
  timeseriesResults.map(({ data }) => ({
    ...objectToSnakeCase({ ...data, timeseries: undefined }),

    timeseries: (data && data.timeseries) || undefined
  }));
