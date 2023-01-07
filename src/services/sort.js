import _ from 'lodash';

import configJson from '../config/config.json';

export function sort(data, config) {
  let result = {};

  // sort the following properties based on their config arrays
  const customSortProperties = ['priority', 'type', 'status'];

  if (customSortProperties.includes(config.property)) {
    result = sortBasedOnArray(
      data,
      configJson[config.property], // sort config for each property
      config.property,
      config.order
    );
  } else {
    // sort all others by numerical or alphabetical order
    result = _.orderBy(data, config.property, config.order);
  }

  return result;
}

export function sortBasedOnArray(data, sortConfig, property, order) {
  // convert property to numerical value in each element based on sort config
  data.forEach((i) => {
    i[property] = sortConfig.indexOf(i[property]);
  });

  // sort array based on numerical values
  data = _.orderBy(data, property, order);

  // convert numerical values back to strings
  data.forEach((i) => {
    i[property] = sortConfig[i[property]];
  });

  return data;
}
