import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  // calculates the current start index based on the current page number
  const startIndex = (pageNumber - 1) * pageSize;
  // sequence that returns an array of items
  // that array starts with the start index and and has the size
  // of a page size
  return _(items).slice(startIndex).take(pageSize).value();
}
