import _ from 'lodash';

export function sort(items, config) {
  // TODO: order priority, status on basis of rules
  return _.orderBy(items, config.property, config.order);
}
