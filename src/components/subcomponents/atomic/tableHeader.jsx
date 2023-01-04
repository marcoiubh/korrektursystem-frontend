import React from 'react';
import '../../../css/table.css';
import SortIconDown from './sortIconDown';
import SortIconUp from './sortIconUp';

const TableHeader = ({ propertyList, sortColumn, onSort }) => {
  const renderSortIcon = (property) => {
    if (property !== sortColumn.property) return null;
    if (sortColumn.order === 'asc') return <SortIconUp />;
    return <SortIconDown />;
  };

  return (
    <thead>
      <tr>
        {propertyList.map((property, index) => (
          <th
            className={`table__header ${property}`}
            key={index}
            onClick={() => onSort(property)}
          >
            {property}
            {renderSortIcon(property)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
