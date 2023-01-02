import moment from 'moment';
import config from '../config/config.json';

export const getFormattedTimestamp = (date) => {
  return moment(date).format(config.dateFormat);
};

export const getFormattedTimeToLive = (time) => {
  return moment(time).format(config.timeFormat);
};
