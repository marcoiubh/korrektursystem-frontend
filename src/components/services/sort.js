import _ from 'lodash';

export function sort(items, config) {
  return _.orderBy(items, config.column, config.order);
}
