import React from 'react';

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (column) => {
    const sortColumnCopy = { ...sortColumn };
    if (sortColumnCopy.column === column)
      sortColumnCopy.order =
        sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumnCopy.column = column;
      sortColumnCopy.order = 'asc';
    }
    onSort(sortColumnCopy);
  };

  const renderSortIcon = (column) => {
    if (column.data !== sortColumn.column) return null;
    if (sortColumn.order === 'asc')
      return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.key}
            onClick={() => raiseSort(column.data)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
