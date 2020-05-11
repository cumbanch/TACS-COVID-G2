const moment = require('moment-timezone');

const { momentTimezone } = require('../../config').server;

moment.tz.setDefault(momentTimezone);
exports.moment = moment;

exports.isInXDaysBeforeRange = (timeserie, days) => moment().diff(moment(timeserie), 'days') <= days;
