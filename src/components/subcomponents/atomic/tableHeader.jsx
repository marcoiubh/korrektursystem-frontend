import React from 'react';
import '../../../css/table.css';
import SortIconDown from './sortIconDown';
import SortIconUp from './sortIconUp';

const TableHeader = ({ propertyList, sortColumn, onSort }) => {
  const raiseSort = (name) => {
    // ignore view button column
    if (!name) return null;
    // shallow copy of sortColumn object
    const newSortColumn = { ...sortColumn };
    // if the same column was pressed, change orientation
    if (newSortColumn.property === name)
      newSortColumn.order =
        sortColumn.order === 'asc' ? 'desc' : 'asc';
    // change sortColumn otherwise
    else {
      newSortColumn.property = name;
      newSortColumn.order = 'asc';
    }
    // finally call onSort event
    onSort(newSortColumn);
  };

  const renderSortIcon = (name) => {
    if (name !== sortColumn.property) return null;
    if (sortColumn.order === 'asc') return <SortIconUp />;
    return <SortIconDown />;
  };

  return (
    <thead>
      <tr>
        {propertyList.map(({ name }, index) => (
          <th
            className={`table__header ${name}`}
            key={index}
            onClick={() => raiseSort(name)}
          >
            {name}
            {renderSortIcon(name)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
