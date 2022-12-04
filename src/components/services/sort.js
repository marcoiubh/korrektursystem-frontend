import _ from 'lodash';

export function sort(items, config) {
  return _.orderBy(items, config.property, config.order);
}
