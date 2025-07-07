const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_ZONE = process.env.TIMEZONE;

function toLocalTime(date, zone = DEFAULT_ZONE) {
  return dayjs(date).tz(zone).format('YYYY-MM-DD HH:mm:ss');
}

function nowInZone(zone = DEFAULT_ZONE) {
  return dayjs().tz(zone).toDate();
}

module.exports = {
  toLocalTime,
  nowInZone,
};