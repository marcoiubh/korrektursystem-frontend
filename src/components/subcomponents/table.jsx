import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader.jsx';

const Table = ({ columns, data, sortColumn, onSort }) => {
  return (
    <table className="table table-hover table-striped">
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
      <TableBody columns={columns} data={data} idProperty="_id" />
    </table>
  );
};

export default Table;
