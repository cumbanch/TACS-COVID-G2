const moment = require('moment-timezone');

const { momentTimezone } = require('../../config').server;

moment.tz.setDefault(momentTimezone);
exports.moment = moment;

exports.getDatesOfDaysBeforeNow = days => {
  const dates = [];
  let startDate = moment().subtract(days, 'days');
  while (startDate.format('M/D/YYYY') !== moment().format('M/D/YYYY')) {
    dates.push(startDate.toDate());
    startDate = startDate.add(1, 'days');
  }
  return dates;
};
