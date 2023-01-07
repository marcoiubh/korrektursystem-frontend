import React from 'react';

import '../../../css/table.css';

import SortIconDown from './SortIconDown';
import SortIconUp from './SortIconUp';

const TableHeader = ({ propertyList, sortColumn, onSort }) => {
  const renderSortIcon = (property) => {
    // for selected column only
    if (property !== sortColumn.property) return null;

    // icon based on order
    if (sortColumn.order === 'asc') return <SortIconUp />;
    return <SortIconDown />;
  };

  return (
    <thead>
      <tr>
        {/* columns */}
        {propertyList.map((property, index) => (
          <th
            className={`table__header ${property}`}
            key={index}
            onClick={() => onSort(property)}
          >
            {/* column name */}
            {property}
            {/* sort icon */}
            {renderSortIcon(property)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
