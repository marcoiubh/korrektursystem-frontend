import moment from 'moment';
import config from '../config/config.json';

export const getFormattedDate = (date) => {
  return moment(date).format(config.dateFormat);
};

export const getFormattedTime = (time) => {
  return moment(time).format(config.timeFormat);
};
