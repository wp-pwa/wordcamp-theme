import moment from 'moment-timezone';

export const TIMEZONE = 'Europe/Belgrade';

export const formatDate = (date, formatString) =>
  moment(date.toISOString())
    .tz(TIMEZONE)
    .format(formatString);
