import _ from 'lodash';
import configJson from '../config/config.json';

export function sort(data, config) {
  let result = {};

  // sort the following properties based on their config arrays
  const customSortProperties = ['priority', 'type', 'status'];

  if (customSortProperties.includes(config.property)) {
    result = sortBasedOnArray(
      data,
      configJson[config.property],
      config.property,
      config.order
    );
  } else {
    // sort by numerical or alphabetical order
    result = _.orderBy(data, config.property, config.order);
  }

  return result;
}

export function sortBasedOnArray(data, sortArray, property, order) {
  // convert property to numerical value in each element based on sortArray
  data.forEach((i) => {
    i[property] = sortArray.indexOf(i[property]);
  });

  // sort array based on numerical values
  data.sort(function (a, b) {
    if (order === 'asc') return b[property] - a[property];
    else return a[property] - b[property];
  });

  // convert numerical values back to strings
  data.forEach((i) => {
    i[property] = sortArray[i[property]];
  });

  return data;
}
